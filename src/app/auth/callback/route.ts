import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendProjectEvent } from "@/lib/email-events";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

/**
 * OAuth-style callback for Supabase auth flows.
 *
 * Used by:
 *  - Email confirmation after signup
 *  - Password recovery (Supabase emails a link with ?code=...)
 *  - Magic link sign-in (future)
 *
 * On first successful confirmation we also fire the welcome email
 * exactly once, gated by a flag in business_profiles so it never
 * double-fires on subsequent logins.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/portal";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Fire welcome email exactly once per account, after email is confirmed.
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from("business_profiles")
            .select("id, business_name, business_email, plan_tier, welcome_sent_at")
            .eq("user_id", user.id)
            .single();

          if (profile && !profile.welcome_sent_at) {
            await sendProjectEvent({
              event: "welcome",
              businessId: profile.id,
              to: profile.business_email || user.email || "",
              vars: {
                businessName: profile.business_name,
                planName: TIERS[profile.plan_tier as TierId]?.name,
              },
            }).catch((e) => console.error("Welcome email failed:", e));

            await supabase
              .from("business_profiles")
              .update({ welcome_sent_at: new Date().toISOString() })
              .eq("id", profile.id);
          }
        }
      } catch (err) {
        // Never block the redirect on side effects
        console.error("Welcome flow side-effect failed:", err);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("Auth callback exchange failed:", error.message);
  }

  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}
