"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, ArrowRight, Loader2 } from "lucide-react";

/**
 * DepositBanner — shown on the portal overview when the user has finished
 * onboarding and is awaiting deposit payment. Status string we look for is
 * `onboarding_submitted` (already produced by /api/onboarding/submit).
 *
 * Once the admin marks the deposit paid (status moves to `planning` via the
 * existing /api/project/status admin endpoint), this banner stops showing.
 */
export function DepositBanner() {
  const [loading, setLoading] = useState(true);
  const [needsDeposit, setNeedsDeposit] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/project/status", { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) setLoading(false);
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setNeedsDeposit(data?.status?.status === "onboarding_submitted");
      } catch {
        // Silent fail — banner just won't show
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-[12px] text-slate-400">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Checking your project status...
      </div>
    );
  }

  if (!needsDeposit) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50 via-white to-[#06b6d4]/5 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
            <CreditCard className="h-5 w-5 text-emerald-700" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              You&apos;re almost there
            </p>
            <h3 className="mt-0.5 text-[15px] font-bold text-slate-900 sm:text-[16px]">
              Pay your 50% deposit to start your build
            </h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600 sm:text-[13px]">
              Onboarding done. The last step is your deposit. Refundable within
              48 hours, plus a 7-day satisfaction guarantee after delivery.
            </p>
          </div>
        </div>
        <Link
          href="/portal/deposit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-4 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-purple-500/20 transition-opacity hover:opacity-90"
        >
          Review &amp; pay
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
