import type { TierId } from "./types";

const TIER_LEVEL: Record<TierId, number> = { starter: 0, growth: 1, scale: 2 };

export function hasAccess(userTier: TierId, requiredTier: TierId): boolean {
  return TIER_LEVEL[userTier] >= TIER_LEVEL[requiredTier];
}

export function tierLabel(tier: TierId): string {
  const labels: Record<TierId, string> = {
    starter: "Premium Website",
    growth: "Reviews + Dashboard",
    scale: "Full Growth Bundle",
  };
  return labels[tier];
}

export function tierLevel(tier: TierId): number {
  return TIER_LEVEL[tier];
}

/** Features available per tier */
export const TIER_FEATURES = {
  starter: ["overview", "leads", "settings"] as const,
  growth: ["overview", "leads", "reviews", "email", "settings"] as const,
  scale: ["overview", "leads", "reviews", "email", "social", "settings"] as const,
} as const;

export type DashboardFeature = "overview" | "leads" | "reviews" | "email" | "social" | "settings";

export function canAccessFeature(tier: TierId, feature: DashboardFeature): boolean {
  return (TIER_FEATURES[tier] as readonly string[]).includes(feature);
}
