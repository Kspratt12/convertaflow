import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { TIERS } from "@/lib/constants";
import { getStatusInfo, isPostLaunch, type ProjectStatus } from "@/lib/project-status";
import type { TierId } from "@/lib/types";

/* ------------------------------------------------------------------ */
/* Types & loaders                                                     */
/* ------------------------------------------------------------------ */

type StepStatus = "done" | "current" | "pending";

interface TimelineStep {
  label: string;
  status: StepStatus;
  hint?: string;
}

interface ProjectData {
  currentStatus: ProjectStatus;
  statusBadge: { label: string; tone: string };
  steps: TimelineStep[];
  details: { label: string; value: string }[];
  hasProject: boolean;
}

/**
 * Visual timeline (always 7 steps shown to the customer).
 * Internal lifecycle has more granular states (planning, milestones, etc.)
 * which collapse into the canonical 'Design / Development' steps below.
 */
const TIMELINE_LABELS: { id: ProjectStatus; label: string }[] = [
  { id: "onboarding_in_progress", label: "Consultation & onboarding" },
  { id: "onboarding_submitted", label: "Brand assets received" },
  { id: "planning", label: "Planning & strategy" },
  { id: "in_progress", label: "Design & build in progress" },
  { id: "revision_round", label: "Client review & revisions" },
  { id: "final_review", label: "Final QA" },
  { id: "delivered", label: "Launch" },
];

function stepsForStatus(current: ProjectStatus): TimelineStep[] {
  // Map any granular state into the canonical timeline index.
  const collapseMap: Partial<Record<ProjectStatus, ProjectStatus>> = {
    not_started: "onboarding_in_progress",
    milestone_25: "in_progress",
    milestone_50: "in_progress",
    milestone_75: "in_progress",
    completed: "delivered",
  };
  const effective = collapseMap[current] ?? current;
  const currentIdx = TIMELINE_LABELS.findIndex((s) => s.id === effective);

  return TIMELINE_LABELS.map((stage, i) => ({
    label: stage.label,
    status: i < currentIdx ? "done" : i === currentIdx ? "current" : "pending",
  }));
}

function deliveryEstimate(tier: TierId | undefined): string {
  switch (tier) {
    case "starter":
      return "5–7 business days";
    case "growth":
      return "7–10 business days";
    case "scale":
    case "scale_single":
      return "10–14 business days";
    case "system_upgrade":
      return "3–5 business days";
    default:
      return "—";
  }
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function loadProject(businessId: string, planTier: TierId): Promise<ProjectData> {
  const supabase = await createClient();

  const [statusRes, revisionsRes, profileRes] = await Promise.all([
    supabase
      .from("project_status")
      .select("status, started_at, updated_at, created_at")
      .eq("business_id", businessId)
      .maybeSingle(),
    supabase
      .from("revision_requests")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId),
    supabase
      .from("business_profiles")
      .select("created_at")
      .eq("id", businessId)
      .maybeSingle(),
  ]);

  const rawStatus = (statusRes.data?.status as ProjectStatus) ?? "not_started";
  const info = getStatusInfo(rawStatus);
  const tier = TIERS[planTier];
  const revisionsUsed = revisionsRes.count ?? 0;
  const revisionsAllowed = tier?.revisions ?? 0;

  // Best-effort started date: project_status.started_at if present, else
  // first updated_at, else profile created_at, else nothing.
  const startedRaw =
    (statusRes.data as { started_at?: string | null } | null)?.started_at ??
    statusRes.data?.created_at ??
    profileRes.data?.created_at ??
    null;

  return {
    currentStatus: rawStatus,
    statusBadge: { label: info.label, tone: info.tone },
    steps: stepsForStatus(rawStatus),
    hasProject: !!statusRes.data,
    details: [
      { label: "Plan", value: tier?.name ?? planTier },
      { label: "Delivery estimate", value: deliveryEstimate(planTier) },
      {
        label: "Revisions used",
        value: revisionsAllowed > 0 ? `${revisionsUsed} of ${revisionsAllowed}` : `${revisionsUsed}`,
      },
      { label: "Started", value: formatDate(startedRaw) },
      {
        label: "Status",
        value: isPostLaunch(rawStatus) ? "Live" : info.label,
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const TONE_BADGE: Record<string, string> = {
  neutral: "bg-slate-500/10 text-slate-600",
  blue: "bg-blue-500/10 text-blue-600",
  purple: "bg-violet-500/10 text-violet-600",
  amber: "bg-amber-500/10 text-amber-600",
  emerald: "bg-emerald-500/10 text-emerald-600",
};

export default async function ProjectPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const data = await loadProject(
    session.profile.id,
    session.profile.plan_tier as TierId
  );

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Project Status</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Track your website build progress.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[14px] font-semibold">Build Timeline</CardTitle>
            <Badge
              className={`text-[11px] ${TONE_BADGE[data.statusBadge.tone] ?? ""}`}
            >
              {data.statusBadge.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!data.hasProject ? (
            <p className="py-6 text-center text-[13px] text-muted-foreground">
              Your project will appear here once it kicks off. Finish your
              onboarding in the Client Portal to get things moving.
            </p>
          ) : (
            <div className="space-y-0">
              {data.steps.map((step, i) => (
                <div key={step.label} className="flex items-start gap-3 relative">
                  {i < data.steps.length - 1 && (
                    <div
                      className={`absolute left-[9px] top-6 w-px h-full ${
                        step.status === "done" ? "bg-primary/30" : "bg-border/50"
                      }`}
                    />
                  )}
                  <div className="relative z-10 mt-0.5 shrink-0">
                    {step.status === "done" ? (
                      <CheckCircle2 className="h-[18px] w-[18px] text-primary" />
                    ) : step.status === "current" ? (
                      <Clock className="h-[18px] w-[18px] text-amber-500" />
                    ) : (
                      <Circle className="h-[18px] w-[18px] text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`text-[13px] font-medium ${
                        step.status === "done"
                          ? "text-foreground"
                          : step.status === "current"
                          ? "text-amber-600"
                          : "text-muted-foreground/50"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.details.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-[13px]"
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium">Need to discuss something?</p>
            <p className="text-[12px] text-muted-foreground">
              Reach out to your project manager.
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5" asChild>
            <Link href="/portal/support">
              Contact Support
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
