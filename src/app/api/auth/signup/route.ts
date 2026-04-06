import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, businessName } = await request.json();

    if (!email || !password || !businessName) {
      return NextResponse.json(
        { error: "Email, password, and business name are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
    }

    // Create business profile
    const { error: profileError } = await supabase
      .from("business_profiles")
      .insert({
        user_id: authData.user.id,
        business_name: businessName,
        business_email: email,
        plan_tier: "starter",
      });

    if (profileError) {
      console.error("Profile creation failed:", profileError);
      // Don't fail the signup — profile can be created later
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
