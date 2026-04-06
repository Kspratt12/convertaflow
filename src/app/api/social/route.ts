import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET — fetch social links for the authenticated user's business */
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

    if (profile.plan_tier !== "scale") {
      return NextResponse.json({ error: "Upgrade required", tier: "scale" }, { status: 403 });
    }

    const { data: links, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("business_id", profile.id)
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ links: links ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 });
  }
}

/** POST — add a social link */
export async function POST(request: NextRequest) {
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

    if (!profile || profile.plan_tier !== "scale") {
      return NextResponse.json({ error: "Upgrade required" }, { status: 403 });
    }

    const body = await request.json();
    const { platform, url } = body;

    if (!platform || !url) {
      return NextResponse.json({ error: "Platform and URL are required" }, { status: 400 });
    }

    const { data: link, error } = await supabase
      .from("social_links")
      .insert({
        business_id: profile.id,
        platform,
        url,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ link });
  } catch {
    return NextResponse.json({ error: "Failed to add social link" }, { status: 500 });
  }
}
