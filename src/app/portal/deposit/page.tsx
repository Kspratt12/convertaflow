import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ShieldCheck,
  RefreshCcw,
  BadgeCheck,
  CreditCard,
  Clock,
  ArrowRight,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";
import { getStripePaymentLink, getDepositAmount } from "@/lib/stripe-links";

export const metadata = {
  title: "Pay Your Deposit · Convertaflow",
};

export default async function DepositPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const tierId = session.profile.plan_tier as TierId;
  const tier = TIERS[tierId];
  const deposit = getDepositAmount(tierId);
  const paymentLink = getStripePaymentLink(tierId);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#06b6d4]">
          Step 2 of 2
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Lock in your build with a 50% deposit
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
          You finished your onboarding. The last step before we start building
          is your deposit. Here&apos;s exactly how it works so there are no
          surprises.
        </p>
      </div>

      {/* The big number */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-emerald-700">
          Your deposit today
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {deposit}
          </span>
          <span className="text-[14px] text-slate-500">
            (50% of {tier.price})
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
          The remaining 50% is due only after we deliver your build and
          you&apos;ve had a chance to look it over. You don&apos;t pay the rest
          until you&apos;re happy.
        </p>
      </div>

      {/* How it works */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-[16px] font-bold text-slate-900">How this works</h2>
        <ol className="mt-4 space-y-4">
          {[
            {
              n: "1",
              title: "You pay your 50% deposit today",
              body: "Your build is officially queued. We start within 1 business day.",
            },
            {
              n: "2",
              title: "We build your project",
              body: `${tier.deliveryDays} from start to delivery. You can track progress in this portal.`,
            },
            {
              n: "3",
              title: "We deliver and you review",
              body: "You get 7 days to look it over. If something isn't right, we make it right (or you get 100% of your deposit back).",
            },
            {
              n: "4",
              title: "You pay the remaining 50%",
              body: "Once you've approved the build, the rest is due. That's it.",
            },
          ].map((s) => (
            <li key={s.n} className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] text-[12px] font-bold text-white">
                {s.n}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-900">
                  {s.title}
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Guarantees */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: RefreshCcw,
            title: "48-hour refund",
            body: "Change your mind in 48 hours? Full deposit refund, no questions.",
          },
          {
            icon: BadgeCheck,
            title: "7-day satisfaction",
            body: "Don't love what we built? 100% of your deposit back.",
          },
          {
            icon: ShieldCheck,
            title: "No contracts",
            body: "Monthly support is month-to-month. Cancel anytime.",
          },
        ].map((g) => (
          <div
            key={g.title}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-50/40 p-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
              <g.icon className="h-4 w-4 text-emerald-700" />
            </div>
            <p className="mt-3 text-[13px] font-bold text-slate-900">
              {g.title}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              {g.body}
            </p>
          </div>
        ))}
      </div>

      {/* The pay action */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <p className="text-[14px] font-semibold text-slate-900">
          Ready to start your build?
        </p>
        <p className="mt-1 text-[13px] text-slate-600">
          Click below to pay your deposit securely. You&apos;ll be back in this
          portal in under a minute.
        </p>

        {paymentLink ? (
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-5 py-3 text-[14px] font-semibold text-white shadow-md shadow-purple-500/20 transition-opacity hover:opacity-90"
          >
            <CreditCard className="h-4 w-4" />
            Pay {deposit} deposit
            <ArrowRight className="h-4 w-4" />
          </a>
        ) : (
          <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-amber-700" />
              <div>
                <p className="text-[13px] font-semibold text-amber-900">
                  We&apos;ll send your payment link by email shortly
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-amber-800">
                  Our team has been notified that you&apos;re ready. You&apos;ll
                  receive a secure Stripe link at your account email within 1
                  business hour. As soon as your deposit clears, your build is
                  queued and you&apos;ll see the status update in this portal.
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="mt-4 text-[11px] text-slate-500">
          Payments are processed securely by Stripe. Convertaflow never sees or
          stores your card details.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/portal"
          className="text-[12px] font-medium text-slate-500 hover:text-slate-700"
        >
          ← Back to portal
        </Link>
      </div>
    </div>
  );
}
