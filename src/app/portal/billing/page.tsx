import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { TIERS } from "@/lib/constants";
import { requiresMonthly, getNextTier, tierShortLabel } from "@/lib/tier";

const STATUS_LABEL: Record<string, { label: string; tone: string }> = {
  active: { label: "Active", tone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  trial: { label: "Trial", tone: "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/20" },
  past_due: { label: "Past due", tone: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  canceled: { label: "Canceled", tone: "text-red-400 bg-red-500/10 border-red-500/20" },
};

export default async function BillingPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const profile = session.profile;
  const tier = TIERS[profile.plan_tier];
  const status = STATUS_LABEL[profile.plan_status] || STATUS_LABEL.active;
  const monthlyRequired = requiresMonthly(profile.plan_tier);
  const nextTier = getNextTier(profile.plan_tier);

  const planStarted = profile.plan_started_at
    ? new Date(profile.plan_started_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const hasStripe = !!profile.stripe_customer_id;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white/90 sm:text-2xl">Billing & Subscription</h1>
        <p className="mt-1 text-[13px] text-white/45 sm:text-[14px]">
          Manage your plan, payment, and renewal status.
        </p>
      </div>

      {/* Plan summary card */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <div className="border-b border-white/[0.06] bg-white/[0.02] px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
                Current Plan
              </p>
              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{tier.name}</h2>
              <p className="mt-0.5 text-[12px] text-[#8b5cf6] font-medium">{tier.audience}</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.tone}`}
            >
              {status.label}
            </span>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
              One-time build
            </p>
            <p className="mt-1 text-2xl font-extrabold text-white">{tier.price}</p>
            <p className="text-[12px] text-white/40">{tier.priceNote}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Monthly
            </p>
            <p className="mt-1 text-2xl font-extrabold text-white">{tier.monthly}</p>
            <p className="text-[12px] text-white/40">
              {monthlyRequired ? "Required" : "Optional"} · {tier.monthlyNote}
            </p>
          </div>
        </div>

        {planStarted && (
          <div className="border-t border-white/[0.06] px-5 py-3 sm:px-6">
            <p className="text-[12px] text-white/40">
              Plan started {planStarted}
            </p>
          </div>
        )}
      </div>

      {/* Payment status */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06b6d4]/10">
            <CreditCard className="h-5 w-5 text-[#06b6d4]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] font-semibold text-white/90 sm:text-[15px]">
              Payment Method
            </h3>
            {hasStripe ? (
              <>
                <p className="mt-1 text-[13px] text-white/50">
                  Manage your card, invoices, and subscription in your secure billing portal.
                </p>
                <Link
                  href="/api/billing/portal"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Open Billing Portal
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </>
            ) : (
              <>
                <p className="mt-1 text-[13px] text-white/55">
                  Your account is in <span className="text-white/85 font-medium">trial</span> status. Once you finish onboarding, our team reviews your intake and sends a secure payment link to activate your plan.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Link
                    href="/portal/onboarding"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Continue Onboarding
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-[11.5px] text-white/35">No charge until you confirm.</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* What's included */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <h3 className="text-[14px] font-semibold text-white/90 sm:text-[15px]">
          What&apos;s included in {tierShortLabel(profile.plan_tier)}
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {tier.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-[13px] text-white/65"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#06b6d4]" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Upgrade prompt */}
      {nextTier && (
        <div className="rounded-2xl border border-[#7c3aed]/20 bg-gradient-to-br from-[#7c3aed]/[0.06] to-[#3b82f6]/[0.04] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-semibold text-white sm:text-[15px]">
                Ready for more?
              </h3>
              <p className="mt-1 text-[13px] text-white/55">
                Upgrade to <span className="text-white/90 font-medium">{TIERS[nextTier].name}</span> to unlock {TIERS[nextTier].features.length - tier.features.length > 0 ? `${TIERS[nextTier].features.length - tier.features.length}+ ` : ""}additional features.
              </p>
              <Link
                href="/pricing"
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8b5cf6] hover:text-[#06b6d4]"
              >
                Compare plans
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Trust strip */}
      <div className="flex items-start gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 text-[11.5px] text-white/40">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
        All payments are processed securely. We never store your card details — billing is handled by our payment provider.
      </div>
    </div>
  );
}
