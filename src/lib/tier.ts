import type { TierId, PlanKind } from "./types";
import { TIERS } from "./constants";

const TIER_LEVEL: Record<TierId, number> = {
  starter: 0,
  system_upgrade: 1,
  growth: 1,
  scale_single: 2,
  scale: 2,
};

/** Tiers shown publicly in the main pricing cards (the 3 bundle tiers) */
export const MAIN_TIER_IDS: TierId[] = ["starter", "growth", "scale"];

/** Single (no-website-rebuild) tiers shown in the alternate path */
export const SINGLE_TIER_IDS: TierId[] = ["system_upgrade", "scale_single"];

/** Bundle plans include a website build. Single plans plug into an existing site. */
const PLAN_KIND: Record<TierId, PlanKind> = {
  starter: "bundle",
  growth: "bundle",
  scale: "bundle",
  system_upgrade: "single",
  scale_single: "single",
};

export function planKind(tier: TierId): PlanKind {
  return PLAN_KIND[tier];
}

export function isBundle(tier: TierId): boolean {
  return PLAN_KIND[tier] === "bundle";
}

export function isSingle(tier: TierId): boolean {
  return PLAN_KIND[tier] === "single";
}

/** Friendly long-form name like "tier1_bundle" — useful for analytics & email tags */
export function planCode(tier: TierId): string {
  switch (tier) {
    case "starter": return "tier1_bundle";
    case "growth": return "tier2_bundle";
    case "scale": return "tier3_bundle";
    case "system_upgrade": return "tier2_single";
    case "scale_single": return "tier3_single";
  }
}

/** Whether the plan includes building a brand-new website */
export function hasWebsiteBuild(tier: TierId): boolean {
  return isBundle(tier);
}

/** Whether the plan includes the systems layer (lead capture, automation, dashboard) */
export function hasSystemsLayer(tier: TierId): boolean {
  return tier !== "starter";
}

/** Whether the plan includes social/advanced automation */
export function hasSocialAutomation(tier: TierId): boolean {
  return tier === "scale" || tier === "scale_single";
}

/** Whether the plan supports video uploads in the portal */
export function hasVideoUploads(tier: TierId): boolean {
  return tier === "scale" || tier === "scale_single";
}

export function hasAccess(userTier: TierId, requiredTier: TierId): boolean {
  return TIER_LEVEL[userTier] >= TIER_LEVEL[requiredTier];
}

export function tierLabel(tier: TierId): string {
  return TIERS[tier].name;
}

export function tierShortLabel(tier: TierId): string {
  return TIERS[tier].shortName;
}

export function tierLevel(tier: TierId): number {
  return TIER_LEVEL[tier];
}

export function getNextTier(tier: TierId): TierId | null {
  if (tier === "starter") return "growth";
  if (tier === "system_upgrade") return "scale_single";
  if (tier === "scale_single") return "scale";
  if (tier === "growth") return "scale";
  return null;
}

/** Whether the plan requires monthly billing (vs optional) */
export function requiresMonthly(tier: TierId): boolean {
  return tier !== "starter";
}

/** Features available per tier */
export const TIER_FEATURES = {
  starter: ["overview", "project", "settings"] as const,
  system_upgrade: ["overview", "project", "leads", "reviews", "email", "settings"] as const,
  growth: ["overview", "project", "leads", "reviews", "email", "settings"] as const,
  scale_single: ["overview", "project", "leads", "reviews", "email", "social", "settings"] as const,
  scale: ["overview", "project", "leads", "reviews", "email", "social", "settings"] as const,
} as const;

export type DashboardFeature = "overview" | "project" | "leads" | "reviews" | "email" | "social" | "settings";

export function canAccessFeature(tier: TierId, feature: DashboardFeature): boolean {
  return (TIER_FEATURES[tier] as readonly string[]).includes(feature);
}
