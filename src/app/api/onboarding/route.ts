import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { section, data, completed } = await request.json();
    if (!section || typeof data !== "object") {
      return NextResponse.json({ error: "Missing section or data" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("onboarding_submissions").upsert(
      {
        business_id: session.profile.id,
        section,
        data,
        completed: !!completed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "business_id,section" }
    );

    if (error) {
      console.error("Onboarding save failed:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Onboarding save error:", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("onboarding_submissions")
    .select("section, data, completed")
    .eq("business_id", session.profile.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ submissions: data || [] });
}
