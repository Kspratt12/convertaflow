import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, reviewRequestEmail, isEmailConfigured } from "@/lib/email";

/** GET — fetch review requests for the authenticated user's business */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("business_profiles")
      .select("id, plan_tier")
      .eq("user_id", user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "No business profile" }, { status: 404 });
    }

    // Tier check — reviews require growth or scale
    if (profile.plan_tier === "starter") {
      return NextResponse.json({ error: "Upgrade required", tier: "growth" }, { status: 403 });
    }

    const { data: reviews, error } = await supabase
      .from("review_requests")
      .select("*")
      .eq("business_id", profile.id)
      .order("sent_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ reviews: reviews ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

/** POST — send a new review request */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("business_profiles")
      .select("id, business_name, google_review_url, plan_tier")
      .eq("user_id", user.id)
      .single();

    if (!profile || profile.plan_tier === "starter") {
      return NextResponse.json({ error: "Upgrade required" }, { status: 403 });
    }

    const body = await request.json();
    const { customerName, customerEmail } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Customer name and email are required" },
        { status: 400 }
      );
    }

    const reviewUrl = profile.google_review_url || "https://g.page/review/your-business";

    // Create review request
    const { data: review, error } = await supabase
      .from("review_requests")
      .insert({
        business_id: profile.id,
        customer_name: customerName,
        customer_email: customerEmail,
        review_url: reviewUrl,
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await supabase.from("activity_logs").insert({
      business_id: profile.id,
      action: "Review request sent",
      target: customerName,
      type: "review",
    });

    // Send review request email
    if (isEmailConfigured()) {
      try {
        const emailResult = await sendEmail({
          to: customerEmail,
          ...reviewRequestEmail(profile.business_name, customerName, reviewUrl),
        });

        // Log email event
        await supabase.from("email_events").insert({
          business_id: profile.id,
          email_type: "review_request",
          recipient_email: customerEmail,
          subject: `${profile.business_name} would love your feedback`,
          status: "Sent",
          resend_id: emailResult?.id || null,
        });
      } catch (emailErr) {
        console.error("Review request email failed:", emailErr);
      }
    }

    return NextResponse.json({ review });
  } catch {
    return NextResponse.json({ error: "Failed to send review request" }, { status: 500 });
  }
}
