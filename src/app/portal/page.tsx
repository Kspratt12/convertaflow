"use client";

import Link from "next/link";
import {
  ClipboardList,
  Upload,
  Edit3,
  HelpCircle,
  Package,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useBusiness } from "@/components/dashboard/business-provider";
import { TIERS } from "@/lib/constants";

const PROJECT_STAGES = [
  "Onboarding",
  "Planning",
  "Design",
  "Revision",
  "Final Review",
  "Delivered",
  "Completed",
];

const quickActions = [
  {
    label: "Continue Onboarding",
    description: "Complete your project questionnaire",
    href: "/portal/onboarding",
    icon: ClipboardList,
  },
  {
    label: "Upload Assets",
    description: "Share logos, photos, and files",
    href: "/portal/uploads",
    icon: Upload,
  },
  {
    label: "Request Revision",
    description: "Submit design change requests",
    href: "/portal/revisions",
    icon: Edit3,
  },
  {
    label: "Contact Support",
    description: "Get help from our team",
    href: "/portal/support",
    icon: HelpCircle,
  },
  {
    label: "View Delivery",
    description: "Access your project links",
    href: "/portal/delivery",
    icon: Package,
  },
];

export default function PortalOverviewPage() {
  const { businessName, tier } = useBusiness();
  const tierConfig = TIERS[tier];
  const currentStageIndex = 0; // onboarding stage
  const onboardingSections = 8;
  const completedSections = 0;
  const progressPercent = Math.round((completedSections / onboardingSections) * 100);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white/90">
          Welcome back, {businessName}
        </h1>
        <p className="mt-1 text-[14px] text-white/50">
          Your project hub — everything you need in one place.
        </p>
      </div>

      {/* Top cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Plan card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20">
              <Sparkles className="h-5 w-5 text-[#06b6d4]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
                Your Plan
              </p>
              <p className="text-[15px] font-semibold text-white/90">
                {tierConfig.name}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-white/90">{tierConfig.price}</span>
            <span className="text-[12px] text-white/40">{tierConfig.priceNote}</span>
          </div>
          {tierConfig.monthlyRequired && (
            <p className="mt-1 text-[12px] text-white/40">
              + {tierConfig.monthly} {tierConfig.monthlyNote}
            </p>
          )}
        </div>

        {/* Project Status card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20">
              <Clock className="h-5 w-5 text-[#06b6d4]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
                Project Status
              </p>
              <p className="text-[15px] font-semibold text-white/90">
                {PROJECT_STAGES[currentStageIndex]}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-white/40 mb-1.5">
              <span>Progress</span>
              <span>
                Stage {currentStageIndex + 1} of {PROJECT_STAGES.length}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] transition-all"
                style={{
                  width: `${((currentStageIndex + 1) / PROJECT_STAGES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Onboarding Progress card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20">
              <CheckCircle2 className="h-5 w-5 text-[#06b6d4]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">
                Onboarding
              </p>
              <p className="text-[15px] font-semibold text-white/90">
                {completedSections} of {onboardingSections} sections
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-white/40 mb-1.5">
              <span>Completion</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-[15px] font-semibold text-white/70">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] transition-colors group-hover:bg-white/[0.08]">
                  <action.icon className="h-5 w-5 text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-white/90">
                    {action.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-white/40">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
