import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, adminNewSignupEmail, isEmailConfigured } from "@/lib/email";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

const VALID_TIERS: TierId[] = ["starter", "growth", "scale", "system_upgrade", "scale_single"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      businessName,
      contactName,
      phone,
      description,
      goal,
      plan,
    } = body;

    if (!email || !password || !businessName || !contactName) {
      return NextResponse.json(
        { error: "Email, password, business name, and contact name are required" },
        { status: 400 }
      );
    }

    const planTier: TierId = VALID_TIERS.includes(plan as TierId)
      ? (plan as TierId)
      : "growth";

    const supabase = await createClient();

    // 1. Create auth user
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

    // 2. Create business profile with plan
    const { data: profile, error: profileError } = await supabase
      .from("business_profiles")
      .insert({
        user_id: authData.user.id,
        business_name: businessName,
        business_email: email,
        phone: phone || null,
        plan_tier: planTier,
        plan_status: "trial",
      })
      .select()
      .single();

    if (profileError) {
      console.error("Profile creation failed:", profileError);
      return NextResponse.json(
        { error: "Account created but profile setup failed. Please contact support." },
        { status: 500 }
      );
    }

    // 3. Save initial intake into onboarding_submissions (best-effort)
    if (profile) {
      const intake = {
        business_name: businessName,
        contact_name: contactName,
        contact_email: email,
        contact_phone: phone || "",
        description: description || "",
        top_goal: goal || "",
      };

      await supabase.from("onboarding_submissions").upsert(
        {
          business_id: profile.id,
          section: "initial_intake",
          data: intake,
          completed: true,
        },
        { onConflict: "business_id,section" }
      );

      // Initialize project_status row
      await supabase.from("project_status").upsert(
        {
          business_id: profile.id,
          status: "onboarding_in_progress",
        },
        { onConflict: "business_id" }
      );

      // Welcome email fires from /auth/callback once the customer
      // confirms their email — that way they don't get welcomed
      // before they can actually sign in.

      // Notify admin so they know a new customer just signed up
      if (isEmailConfigured() && process.env.NOTIFICATION_EMAIL) {
        try {
          await sendEmail({
            to: process.env.NOTIFICATION_EMAIL,
            ...adminNewSignupEmail({
              businessName,
              contactName,
              email,
              phone,
              planName: TIERS[planTier]?.name ?? planTier,
            }),
          });
        } catch (err) {
          console.error("Admin signup notification failed:", err);
        }
      }
    }

    return NextResponse.json({ success: true, plan: planTier });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
