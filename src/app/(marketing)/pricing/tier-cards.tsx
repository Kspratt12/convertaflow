"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Star,
  Clock,
  RotateCcw,
  Globe,
  Info,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIERS, PLAN_SLUGS, type TierConfig } from "@/lib/constants";
import type { TierId } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * InfoPill — a small explainer popover that opens on click. Works on
 * mobile (tap to open, tap outside to close) and desktop (click to open).
 * Uses no external library so it stays light.
 */
function InfoPill({
  label,
  Icon,
  explanation,
}: {
  label: string;
  Icon: typeof Clock;
  explanation: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/60 hover:text-white/85 transition-colors"
      >
        <Icon className="h-3.5 w-3.5 text-[#06b6d4]" />
        <span>{label}</span>
        <Info className="h-3 w-3 text-white/30 group-hover:text-white/55 transition-colors" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-60 rounded-xl border border-white/[0.10] bg-[#0e0e2a] p-3 text-[11px] leading-relaxed text-white/75 shadow-xl shadow-black/40">
          {explanation}
        </div>
      )}
    </div>
  );
}

/**
 * GuaranteePill — tappable explainer for the refund + satisfaction
 * combo badge. Same click-to-open pattern as InfoPill but styled
 * emerald to match its parent badge text.
 */
function GuaranteePill() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-1.5 text-[11px] text-emerald-400/85 hover:text-emerald-400 transition-colors"
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>48-hour deposit refund · 7-day satisfaction guarantee</span>
        <Info className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-20 mt-2 w-72 -translate-x-1/2 rounded-xl border border-emerald-500/20 bg-[#0e0e2a] p-3.5 text-[11px] leading-relaxed text-white/80 shadow-xl shadow-black/40">
          <p className="font-semibold text-emerald-400">48-hour deposit refund</p>
          <p className="mt-1">
            Change your mind in the first 48 hours? Full refund of your deposit, no questions. After we start building, the deposit becomes non-refundable so we can protect the time we&apos;ve already invested.
          </p>
          <div className="my-2.5 h-px bg-white/[0.08]" />
          <p className="font-semibold text-emerald-400">7-day satisfaction guarantee</p>
          <p className="mt-1">
            Once we deliver your build, you have 7 days to inspect it. If you&apos;re not happy and we can&apos;t make it right, you get 100% of your deposit back. We just want you to love what we built.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Pricing tier cards with a per-card "include a website?" toggle for
 * Tier 2 and Tier 3. The toggle swaps the displayed tier data between
 * the with-website variant (growth/scale) and the tools-only variant
 * (system_upgrade/scale_single). Both already exist in the database,
 * so the toggle is a pure UI swap that flows through to the right
 * signup slug — no schema work, no breaking changes.
 *
 * Tier 1 (starter) doesn't get a toggle — it IS the website.
 */
interface TierCardsProps {
  /** Canonical 'with website' tier IDs in display order */
  tierIds: TierId[];
}

export function PricingTierCards({ tierIds }: TierCardsProps) {
  // Per-tier "include website" state. Default = true (include website).
  const [includeWebsite, setIncludeWebsite] = useState<Record<TierId, boolean>>(
    {} as Record<TierId, boolean>
  );

  function getDisplayTier(canonicalId: TierId): {
    tier: TierConfig;
    slug: string;
    hasToggle: boolean;
  } {
    // Tier 1 (starter) — no toggle, always shows the website tier.
    if (canonicalId === "starter") {
      return {
        tier: TIERS.starter,
        slug: PLAN_SLUGS.starter,
        hasToggle: false,
      };
    }

    // Tier 2 (growth) — toggle between growth (with website) and
    // system_upgrade (tools only).
    if (canonicalId === "growth") {
      const withWebsite = includeWebsite.growth ?? true;
      const tier = withWebsite ? TIERS.growth : TIERS.system_upgrade;
      const slug = withWebsite ? PLAN_SLUGS.growth : PLAN_SLUGS.system_upgrade;
      return { tier, slug, hasToggle: true };
    }

    // Tier 3 (scale) — toggle between scale (with website) and
    // scale_single (tools + custom build only).
    if (canonicalId === "scale") {
      const withWebsite = includeWebsite.scale ?? true;
      const tier = withWebsite ? TIERS.scale : TIERS.scale_single;
      const slug = withWebsite ? PLAN_SLUGS.scale : PLAN_SLUGS.scale_single;
      return { tier, slug, hasToggle: true };
    }

    // Fallback (shouldn't hit, but typescript wants it)
    return {
      tier: TIERS[canonicalId],
      slug: PLAN_SLUGS[canonicalId],
      hasToggle: false,
    };
  }

  function toggle(canonicalId: TierId) {
    setIncludeWebsite((prev) => ({
      ...prev,
      [canonicalId]: !(prev[canonicalId] ?? true),
    }));
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {tierIds.map((canonicalId) => {
        const { tier, slug, hasToggle } = getDisplayTier(canonicalId);
        const withWebsite = includeWebsite[canonicalId] ?? true;
        return (
          <div
            key={canonicalId}
            className={cn(
              "relative flex flex-col rounded-2xl border p-5 sm:p-6",
              tier.highlighted
                ? "border-[#7c3aed]/40 bg-white/[0.06] shadow-xl shadow-purple-500/[0.08] ring-1 ring-[#7c3aed]/20 lg:scale-[1.02]"
                : "border-white/[0.06] bg-white/[0.03]"
            )}
          >
            {/* Subtle radial halo behind the highlighted (Tier 2) card.
                Pure CSS, no animation, no perf cost. Pulls the eye without
                feeling busy. */}
            {tier.highlighted && (
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-6 -top-12 -bottom-6 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.18)_0%,_rgba(124,58,237,0.08)_35%,_transparent_70%)] blur-2xl"
              />
            )}
            {tier.highlighted && (
              <Badge className="absolute -top-2.5 left-5 gap-1 text-[11px] font-semibold tracking-wide bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0">
                <Star className="h-3 w-3" />
                Most Popular
              </Badge>
            )}

            <h3 className="text-base sm:text-lg font-bold text-white">
              {tier.name}
            </h3>
            <p className="mt-0.5 text-[12px] sm:text-[13px] font-medium text-[#8b5cf6]">
              {tier.audience}
            </p>

            {/* Website include / exclude toggle (Tier 2 + Tier 3 only) */}
            {hasToggle && (
              <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => withWebsite || toggle(canonicalId)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] sm:text-[12px] font-medium transition-all",
                      withWebsite
                        ? "bg-[#7c3aed] text-white shadow-md shadow-purple-500/20"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    <Globe className="h-3 w-3" />
                    Build me a website
                  </button>
                  <button
                    type="button"
                    onClick={() => !withWebsite || toggle(canonicalId)}
                    className={cn(
                      "flex items-center justify-center rounded-lg px-2 py-2 text-[11px] sm:text-[12px] font-medium transition-all",
                      !withWebsite
                        ? "bg-[#7c3aed] text-white shadow-md shadow-purple-500/20"
                        : "text-white/50 hover:text-white/80"
                    )}
                  >
                    I have a site
                  </button>
                </div>
              </div>
            )}

            {/* One-time build price */}
            <div className="mt-4 sm:mt-5">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {tier.price}
              </span>
              <p className="mt-0.5 text-[12px] sm:text-[13px] text-white/40">
                {tier.priceNote}
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-500/[0.08] border border-emerald-500/20 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-emerald-400">
                50% to start. 50% when you&apos;re happy.
              </p>
            </div>

            {/* Monthly fee — clearly separated. Tier 1 gets a softer
                visual treatment because the monthly is OPTIONAL for them. */}
            <div
              className={cn(
                "mt-3 rounded-xl border px-3 py-2.5",
                tier.monthlyRequired
                  ? "border-[#06b6d4]/15 bg-[#06b6d4]/[0.04]"
                  : "border-dashed border-white/[0.10] bg-white/[0.02]"
              )}
            >
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-white">
                  {tier.monthly}
                </span>
                <span className="text-[11px] sm:text-[12px] text-white/55">
                  {tier.monthlyNote}
                </span>
              </div>
              {!tier.monthlyRequired && (
                <p className="mt-1 text-[10px] text-white/40">
                  Add it now or later, no contract.
                </p>
              )}
            </div>

            {/* Delivery + Edit rounds — each pill is now a tappable
                explainer popover so customers can find out what the numbers
                mean without us writing a wall of text on the card. */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-white/[0.03] border border-white/[0.04] px-3 py-2.5">
              <InfoPill
                Icon={Clock}
                label={tier.deliveryDays}
                explanation={`Once you finish onboarding and we have everything we need, your ${tier.name.toLowerCase()} build is delivered within ${tier.deliveryDays}. We move fast without cutting corners.`}
              />
              <div className="h-4 w-px bg-white/[0.08]" />
              <InfoPill
                Icon={RotateCcw}
                label={`${tier.revisions} rounds of edits`}
                explanation={`You get ${tier.revisions} rounds of edits during the build (before launch). Each round is your chance to review what we built and tell us what to change. After launch, you can request changes anytime through your portal.`}
              />
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-white/45">
              {tier.description}
            </p>

            {/* What you get with the build. The 'magic' / standout feature
                in each tier (sparkle line for Tier 3, custom website / growth
                tools line for Tier 1 and Tier 2) gets a lime-green highlight
                so the eye lands on the most important thing. */}
            <ul className="mt-4 flex-1 space-y-2 border-t border-white/[0.06] pt-4">
              {tier.features.map((feature, idx) => {
                // Feature is "magic" if it starts with the sparkle emoji,
                // OR if it's the second feature on a tier without a sparkle
                // (the one right after the 'Everything in lower tier' anchor).
                const startsWithSparkle = feature.trim().startsWith("✨");
                const tierHasSparkle = tier.features.some((f) =>
                  f.trim().startsWith("✨")
                );
                // For tiers without a sparkle line, highlight the first
                // feature that isn't an 'Everything in...' anchor.
                const isFirstRealFeature =
                  !tierHasSparkle &&
                  !feature.startsWith("Everything in") &&
                  tier.features
                    .filter((f) => !f.startsWith("Everything in"))
                    .indexOf(feature) === 0 &&
                  idx <= 1;
                const isMagic = startsWithSparkle || isFirstRealFeature;
                return (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-2 text-[12px] sm:text-[13px]",
                      isMagic
                        ? "font-semibold text-[#a3e635] [text-shadow:0_0_18px_rgba(163,230,53,0.18)]"
                        : "text-white/70"
                    )}
                  >
                    <Check
                      className={cn(
                        "mt-0.5 h-3.5 w-3.5 shrink-0",
                        isMagic ? "text-[#a3e635]" : "text-[#06b6d4]"
                      )}
                    />
                    {feature}
                  </li>
                );
              })}
            </ul>

            {/* Flexible spacer — absorbs height differences between tiers
                so the monthly-includes box and Get Started button line up
                across all three cards. */}
            {/* What the monthly fee covers — explicit */}
            <div className="mt-4 rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/[0.05] px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c4b5fd]">
                Your {tier.monthly} also covers
              </p>
              <ul className="mt-2 space-y-1.5">
                {tier.monthlyIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12px] text-white/75"
                  >
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#c4b5fd]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 text-center text-[10px] text-white/25">
              {tier.microcopy}
            </p>

            <Button
              className={cn(
                "mt-3 gap-1.5",
                tier.highlighted
                  ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90"
                  : "border border-[#7c3aed]/40 bg-[#7c3aed]/10 text-white hover:bg-[#7c3aed]/20 hover:border-[#7c3aed]/60"
              )}
              size="lg"
              asChild
            >
              <Link href={`/signup?plan=${slug}`}>
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            {/* Refund + satisfaction guarantee — tappable explainer */}
            <div className="mt-3 flex justify-center">
              <GuaranteePill />
            </div>
          </div>
        );
      })}
    </div>
  );
}
