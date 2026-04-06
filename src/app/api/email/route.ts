import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET — fetch email events for the authenticated user's business */
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

    if (profile.plan_tier === "starter") {
      return NextResponse.json({ error: "Upgrade required", tier: "growth" }, { status: 403 });
    }

    const { data: emails, error } = await supabase
      .from("email_events")
      .select("*")
      .eq("business_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;

    return NextResponse.json({ emails: emails ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}
