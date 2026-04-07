import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import { sendProjectEvent } from "@/lib/email-events";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

/**
 * Client-facing: mark the user's onboarding as submitted.
 * - Advances project_status → 'onboarding_submitted'
 * - Fires the onboarding_submitted email (also logged if Resend isn't configured)
 *
 * Note: this is the only status change a client can trigger themselves.
 * All other status advances are admin-only via /api/project/status.
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const businessId = session.profile.id;

  const { error } = await supabase
    .from("project_status")
    .upsert(
      {
        business_id: businessId,
        status: "onboarding_submitted",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "business_id" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fire confirmation email (best-effort, never fail the submit)
  const tier = TIERS[session.profile.plan_tier as TierId];
  await sendProjectEvent({
    event: "onboarding_submitted",
    businessId,
    to: session.profile.business_email || session.user.email,
    vars: {
      businessName: session.profile.business_name,
      planName: tier?.name,
    },
  }).catch((e) => console.error("Onboarding submit email failed:", e));

  return NextResponse.json({ success: true });
}
