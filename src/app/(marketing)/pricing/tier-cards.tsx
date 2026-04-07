"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Star,
  Clock,
  RotateCcw,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIERS, PLAN_SLUGS, type TierConfig } from "@/lib/constants";
import type { TierId } from "@/lib/types";
import { cn } from "@/lib/utils";

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
            </div>

            {/* Monthly fee — clearly separated */}
            <div className="mt-3 rounded-xl border border-[#06b6d4]/15 bg-[#06b6d4]/[0.04] px-3 py-2.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-white">
                  {tier.monthly}
                </span>
                <span className="text-[11px] sm:text-[12px] text-white/45">
                  {tier.monthlyNote}
                </span>
              </div>
            </div>

            {/* Delivery + Revisions */}
            <div className="mt-3 flex gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/60">
                <Clock className="h-3.5 w-3.5 text-[#06b6d4]" />
                {tier.deliveryDays}
              </div>
              <div className="h-4 w-px bg-white/[0.08]" />
              <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/60">
                <RotateCcw className="h-3.5 w-3.5 text-[#06b6d4]" />
                {tier.revisions} revisions
              </div>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-white/45">
              {tier.description}
            </p>

            {/* What you get with the build */}
            <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/70"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Flexible spacer — absorbs height differences between tiers
                so the monthly-includes box and Get Started button line up
                across all three cards. */}
            <div className="flex-1 min-h-[8px]" />

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
          </div>
        );
      })}
    </div>
  );
}
