import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, newLeadEmail, isEmailConfigured } from "@/lib/email";

/** GET — fetch leads for the authenticated user's business */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("business_profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "No business profile" }, { status: 404 });
    }

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .eq("business_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ leads: leads ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

/** POST — create a new lead (called from website lead forms) */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessId, name, email, phone, source, message } = body;

    if (!businessId || !name || !email) {
      return NextResponse.json(
        { error: "businessId, name, and email are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Insert lead
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        business_id: businessId,
        name,
        email,
        phone: phone || null,
        source: source || "Website",
        message: message || null,
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from("activity_logs").insert({
      business_id: businessId,
      action: "New lead captured",
      target: name,
      type: "lead",
    });

    // Get business profile for notification email
    const { data: profile } = await supabase
      .from("business_profiles")
      .select("business_email")
      .eq("id", businessId)
      .single();

    // Send notification email
    if (isEmailConfigured() && profile?.business_email) {
      try {
        await sendEmail({
          to: profile.business_email,
          ...newLeadEmail(name, email, message),
        });

        // Log email event
        await supabase.from("email_events").insert({
          business_id: businessId,
          email_type: "lead_notification",
          recipient_email: profile.business_email,
          subject: `New lead: ${name}`,
          status: "Sent",
        });
      } catch (emailErr) {
        console.error("Lead notification email failed:", emailErr);
      }
    }

    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
