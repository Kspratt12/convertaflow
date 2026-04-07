import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import { sendProjectEvent, eventForStatus } from "@/lib/email-events";
import { TIERS } from "@/lib/constants";
import type { ProjectStatus } from "@/lib/project-status";
import type { TierId } from "@/lib/types";

const VALID_STATUSES: ProjectStatus[] = [
  "not_started",
  "onboarding_in_progress",
  "onboarding_submitted",
  "planning",
  "in_progress",
  "milestone_25",
  "milestone_50",
  "milestone_75",
  "revision_round",
  "final_review",
  "delivered",
  "completed",
];

/**
 * GET — read the current project status row for the signed-in user.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_status")
    .select("*")
    .eq("business_id", session.profile.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: data });
}

/**
 * POST — admin-only: advance a project status and fire the matching email.
 *
 * Body:
 *   { businessId: string, status: ProjectStatus, notes?: string }
 *
 * Auto-fires the event mapped to that status (if any).
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { businessId, status, notes } = await request.json();
    if (!businessId || !status) {
      return NextResponse.json({ error: "Missing businessId or status" }, { status: 400 });
    }
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Upsert the status
    const { error: statusError } = await supabase
      .from("project_status")
      .upsert(
        {
          business_id: businessId,
          status,
          notes: notes || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "business_id" }
      );

    if (statusError) {
      return NextResponse.json({ error: statusError.message }, { status: 500 });
    }

    // 2. Look up the client business to fire the email
    const { data: profile } = await supabase
      .from("business_profiles")
      .select("business_email, business_name, plan_tier")
      .eq("id", businessId)
      .single();

    let emailResult: { ok: boolean; queued?: boolean; error?: string } | null = null;
    const event = eventForStatus(status as ProjectStatus);
    if (event && profile?.business_email) {
      const tier = TIERS[profile.plan_tier as TierId];
      emailResult = await sendProjectEvent({
        event,
        businessId,
        to: profile.business_email,
        vars: {
          businessName: profile.business_name,
          planName: tier?.name,
          message: notes || undefined,
        },
      });
    }

    return NextResponse.json({
      success: true,
      status,
      emailFired: !!event,
      email: emailResult,
    });
  } catch (err) {
    console.error("Project status update error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
