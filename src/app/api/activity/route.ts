import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET — fetch recent activity for the authenticated user's business */
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

    const { data: activity, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("business_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ activity: activity ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 });
  }
}
