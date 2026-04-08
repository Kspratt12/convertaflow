"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ClipboardList,
  Upload,
  Edit3,
  HelpCircle,
  Package,
  Sparkles,
  CheckCircle2,
  Clock,
  CreditCard,
  PartyPopper,
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
  {
    label: "Billing",
    description: "Manage plan and payment",
    href: "/portal/billing",
    icon: CreditCard,
  },
];

function WelcomeBanner({ planName }: { planName: string }) {
  const params = useSearchParams();
  if (params.get("welcome") !== "1") return null;
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] to-[#06b6d4]/[0.04] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
          <PartyPopper className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-slate-900/95">
            Welcome. Your <span className="text-emerald-300">{planName}</span> account is ready
          </h3>
          <p className="mt-1 text-[13px] text-slate-900/55">
            Next step: complete your project onboarding so our team has everything we need to start your build.
          </p>
          <Link
            href="/portal/onboarding"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-3.5 py-2 text-[12.5px] font-semibold text-slate-900 transition-opacity hover:opacity-90"
          >
            Start onboarding
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PortalOverviewPage() {
  const { businessName, tier } = useBusiness();
  const tierConfig = TIERS[tier];
  const currentStageIndex = 0; // onboarding stage
  const onboardingSections = 8;
  const completedSections = 0;
  const progressPercent = Math.round((completedSections / onboardingSections) * 100);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Suspense fallback={null}>
        <WelcomeBanner planName={tierConfig.name} />
      </Suspense>

      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Welcome back, {businessName}
        </h1>
        <p className="mt-1 text-[13px] text-slate-900/45 sm:text-[14px]">
          Your project hub. Everything you need in one place.
        </p>
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Plan card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20">
              <Sparkles className="h-5 w-5 text-[#06b6d4]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Your Plan
              </p>
              <p className="text-[15px] font-semibold text-slate-900">
                {tierConfig.name}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">{tierConfig.price}</span>
            <span className="text-[12px] text-slate-500">{tierConfig.priceNote}</span>
          </div>
          {tierConfig.monthlyRequired && (
            <p className="mt-1 text-[12px] text-slate-500">
              + {tierConfig.monthly} {tierConfig.monthlyNote}
            </p>
          )}
        </div>

        {/* Project Status card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20">
              <Clock className="h-5 w-5 text-[#06b6d4]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Project Status
              </p>
              <p className="text-[15px] font-semibold text-slate-900">
                {PROJECT_STAGES[currentStageIndex]}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
              <span>Progress</span>
              <span>
                Stage {currentStageIndex + 1} of {PROJECT_STAGES.length}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white">
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
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20">
              <CheckCircle2 className="h-5 w-5 text-[#06b6d4]" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Onboarding
              </p>
              <p className="text-[15px] font-semibold text-slate-900">
                {completedSections} of {onboardingSections} sections
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
              <span>Completion</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white">
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
        <h2 className="mb-4 text-[15px] font-semibold text-slate-700">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white transition-colors group-hover:bg-slate-100">
                  <action.icon className="h-5 w-5 text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-slate-900">
                    {action.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-slate-500">
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
