import type { TierId } from "./types";
import { TIERS } from "./constants";

const TIER_LEVEL: Record<TierId, number> = { starter: 0, growth: 1, scale: 2 };

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
  if (tier === "growth") return "scale";
  return null;
}

/** Features available per tier */
export const TIER_FEATURES = {
  starter: ["overview", "project", "settings"] as const,
  growth: ["overview", "project", "leads", "reviews", "email", "settings"] as const,
  scale: ["overview", "project", "leads", "reviews", "email", "social", "settings"] as const,
} as const;

export type DashboardFeature = "overview" | "project" | "leads" | "reviews" | "email" | "social" | "settings";

export function canAccessFeature(tier: TierId, feature: DashboardFeature): boolean {
  return (TIER_FEATURES[tier] as readonly string[]).includes(feature);
}
