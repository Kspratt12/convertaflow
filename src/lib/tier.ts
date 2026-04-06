import type { TierId } from "./constants";

const TIER_HIERARCHY: TierId[] = ["starter", "growth", "scale"];

export function hasAccess(userTier: TierId, requiredTier: TierId): boolean {
  return (
    TIER_HIERARCHY.indexOf(userTier) >= TIER_HIERARCHY.indexOf(requiredTier)
  );
}

export function tierLabel(tier: TierId): string {
  const labels: Record<TierId, string> = {
    starter: "Premium Website",
    growth: "Reviews + Dashboard",
    scale: "Full Growth Bundle",
  };
  return labels[tier];
}
