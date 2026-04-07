import { redirect } from "next/navigation";
import {
  ClipboardList,
  Lightbulb,
  Paintbrush,
  Edit3,
  Eye,
  Package,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { TIERS } from "@/lib/constants";
import {
  TIMELINE_STAGES,
  getStatusInfo,
  timelinePosition,
  isPostLaunch,
  type ProjectStatus,
} from "@/lib/project-status";
import type { TierId } from "@/lib/types";

const STAGE_META: Record<ProjectStatus, { label: string; icon: typeof ClipboardList; description: string }> = {
  not_started: { label: "Not started", icon: Clock, description: "Your project is created and ready to begin." },
  onboarding_in_progress: { label: "Onboarding", icon: ClipboardList, description: "Complete your project questionnaire." },
  onboarding_submitted: { label: "Submitted", icon: CheckCircle2, description: "We're reviewing everything you sent us." },
  planning: { label: "Planning", icon: Lightbulb, description: "Mapping out structure, content, and strategy." },
  in_progress: { label: "Building", icon: Paintbrush, description: "Your build is actively underway." },
  milestone_25: { label: "25% Complete", icon: TrendingUp, description: "First quarter complete." },
  milestone_50: { label: "50% Complete", icon: TrendingUp, description: "Halfway through your build." },
  milestone_75: { label: "75% Complete", icon: TrendingUp, description: "Final stretch — almost ready." },
  revision_round: { label: "Revisions", icon: Edit3, description: "Review the build and request changes." },
  final_review: { label: "Final Review", icon: Eye, description: "Last look before we hand it over." },
  delivered: { label: "Delivered", icon: Package, description: "Your project is live and ready." },
  completed: { label: "Completed", icon: CheckCircle2, description: "Project wrapped — portal stays open for changes." },
};

export default async function ProjectStatusPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = await createClient();
  const { data: projectRow } = await supabase
    .from("project_status")
    .select("status, notes, updated_at, revisions_used, delivery_estimate")
    .eq("business_id", session.profile.id)
    .maybeSingle();

  const tier = TIERS[session.profile.plan_tier as TierId];
  const statusInfo = getStatusInfo(projectRow?.status);
  const currentStageIndex = timelinePosition(projectRow?.status);
  const percent = statusInfo.percent;
  const revisionsUsed = projectRow?.revisions_used ?? 0;
  const revisionsAvailable = tier.revisions;
  const deliveryEstimate = projectRow?.delivery_estimate ?? tier.deliveryDays;
  const notes =
    projectRow?.notes ??
    "Your onboarding questionnaire is ready to be completed. Once submitted, our team will begin the planning phase.";
  const postLaunch = isPostLaunch(projectRow?.status);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-bold text-white/90 sm:text-2xl">Project Status</h1>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              statusInfo.tone === "emerald" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
              statusInfo.tone === "amber" && "border-amber-500/30 bg-amber-500/10 text-amber-400",
              statusInfo.tone === "purple" && "border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a78bfa]",
              statusInfo.tone === "blue" && "border-[#06b6d4]/30 bg-[#06b6d4]/10 text-[#06b6d4]",
              statusInfo.tone === "neutral" && "border-white/[0.1] bg-white/[0.05] text-white/60"
            )}
          >
            {statusInfo.shortLabel}
          </span>
        </div>
        <p className="mt-1.5 text-[13px] text-white/45 sm:text-[14px]">
          {postLaunch
            ? "Your project is live. Your portal stays open for changes, uploads, and support."
            : "Track your project from start to finish. We keep this updated in real time."}
        </p>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-medium text-white/70">{statusInfo.label}</span>
          <span className="text-white/40">{percent}%</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 text-[12px] text-white/45">{statusInfo.description}</p>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[#06b6d4]" />
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
              Selected Plan
            </p>
          </div>
          <p className="mt-2 text-[15px] font-semibold text-white/90">{tier.shortName}</p>
          <p className="text-[12px] text-white/40">{tier.price}</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-[#06b6d4]" />
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
              Delivery Estimate
            </p>
          </div>
          <p className="mt-2 text-[15px] font-semibold text-white/90">{deliveryEstimate}</p>
          <p className="text-[12px] text-white/40">from onboarding submission</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <Edit3 className="h-4 w-4 text-[#06b6d4]" />
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
              Revisions
            </p>
          </div>
          <p className="mt-2 text-[15px] font-semibold text-white/90">
            {revisionsUsed} / {revisionsAvailable} used
          </p>
          <p className="text-[12px] text-white/40">
            {Math.max(0, revisionsAvailable - revisionsUsed)} remaining
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <h2 className="mb-6 text-[15px] font-semibold text-white/70">Project Timeline</h2>
        <div className="space-y-0">
          {TIMELINE_STAGES.map((stageId, index) => {
            const stage = STAGE_META[stageId];
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isFuture = index > currentStageIndex;
            const isLast = index === TIMELINE_STAGES.length - 1;

            return (
              <div key={stageId} className="flex gap-4">
                {/* Left line + dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      isCompleted
                        ? "border-emerald-500 bg-emerald-500/10"
                        : isCurrent
                        ? "border-[#7c3aed] bg-[#7c3aed]/10"
                        : "border-white/[0.1] bg-white/[0.02]"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <stage.icon
                        className={cn(
                          "h-4 w-4",
                          isCurrent ? "text-[#7c3aed]" : "text-white/20"
                        )}
                      />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 min-h-[24px]",
                        isCompleted ? "bg-emerald-500/30" : "bg-white/[0.06]"
                      )}
                    />
                  )}
                </div>

                {/* Right content */}
                <div className={cn("pb-6", isLast && "pb-0")}>
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "text-[14px] font-semibold",
                        isCompleted
                          ? "text-emerald-400"
                          : isCurrent
                          ? "text-white/90"
                          : "text-white/30"
                      )}
                    >
                      {stage.label}
                    </p>
                    {isCurrent && (
                      <span className="rounded-full bg-[#7c3aed]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#7c3aed] uppercase tracking-wide">
                        Current
                      </span>
                    )}
                    {isCompleted && (
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 uppercase tracking-wide">
                        Done
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "mt-0.5 text-[12px]",
                      isFuture ? "text-white/20" : "text-white/40"
                    )}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <h2 className="mb-3 text-[15px] font-semibold text-white/70">Latest Update</h2>
        <p className="text-[13px] leading-relaxed text-white/50">{notes}</p>
      </div>
    </div>
  );
}
