"use client";

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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBusiness } from "@/components/dashboard/business-provider";
import { TIERS } from "@/lib/constants";

const STAGES = [
  { id: "onboarding", label: "Onboarding", icon: ClipboardList, description: "Complete your project questionnaire and share assets" },
  { id: "planning", label: "Planning", icon: Lightbulb, description: "We map out your site structure, content, and strategy" },
  { id: "design", label: "Design", icon: Paintbrush, description: "Your custom design is being built and refined" },
  { id: "revision", label: "Revision", icon: Edit3, description: "Review your design and request any changes" },
  { id: "final_review", label: "Final Review", icon: Eye, description: "Last look before we prepare for launch" },
  { id: "delivered", label: "Delivered", icon: Package, description: "Your project is live and ready to go" },
  { id: "completed", label: "Completed", icon: CheckCircle2, description: "Project is finalized and wrapped up" },
];

export default function ProjectStatusPage() {
  const { tier } = useBusiness();
  const tierConfig = TIERS[tier];

  // Mock data — in production this comes from project_status table
  const currentStageIndex = 0;
  const revisionsUsed = 0;
  const revisionsAvailable = tierConfig.revisions;
  const deliveryEstimate = tierConfig.deliveryDays;
  const notes = "Your onboarding questionnaire is ready to be completed. Once submitted, our team will begin the planning phase.";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white/90">Project Status</h1>
        <p className="mt-1 text-[14px] text-white/50">
          Track your project from start to finish. We keep this updated in real time.
        </p>
      </div>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[#06b6d4]" />
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
              Selected Plan
            </p>
          </div>
          <p className="mt-2 text-[15px] font-semibold text-white/90">
            {tierConfig.shortName}
          </p>
          <p className="text-[12px] text-white/40">{tierConfig.price}</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-[#06b6d4]" />
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
              Delivery Estimate
            </p>
          </div>
          <p className="mt-2 text-[15px] font-semibold text-white/90">
            {deliveryEstimate}
          </p>
          <p className="text-[12px] text-white/40">from onboarding submission</p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
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
            {revisionsAvailable - revisionsUsed} remaining
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
        <h2 className="mb-6 text-[15px] font-semibold text-white/70">
          Project Timeline
        </h2>
        <div className="space-y-0">
          {STAGES.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isCurrent = index === currentStageIndex;
            const isFuture = index > currentStageIndex;
            const isLast = index === STAGES.length - 1;

            return (
              <div key={stage.id} className="flex gap-4">
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
                        isCompleted
                          ? "bg-emerald-500/30"
                          : "bg-white/[0.06]"
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
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
        <h2 className="mb-3 text-[15px] font-semibold text-white/70">
          Latest Update
        </h2>
        <p className="text-[13px] leading-relaxed text-white/50">{notes}</p>
      </div>
    </div>
  );
}
