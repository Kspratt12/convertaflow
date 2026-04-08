import { TIERS } from "./constants";
import type { TierId } from "./types";

/**
 * Stripe Payment Links per tier.
 *
 * These are PUBLIC payment links you create at https://dashboard.stripe.com/payment-links
 * (one per tier, configured for the 50% deposit amount). Drop them into your
 * `.env.local` like:
 *
 *   NEXT_PUBLIC_STRIPE_LINK_STARTER=https://buy.stripe.com/...
 *   NEXT_PUBLIC_STRIPE_LINK_GROWTH=https://buy.stripe.com/...
 *   NEXT_PUBLIC_STRIPE_LINK_SCALE=https://buy.stripe.com/...
 *   NEXT_PUBLIC_STRIPE_LINK_SYSTEM_UPGRADE=https://buy.stripe.com/...
 *   NEXT_PUBLIC_STRIPE_LINK_SCALE_SINGLE=https://buy.stripe.com/...
 *
 * Until the env vars are set, the Pay button on the deposit page falls back
 * to a "we'll send you a payment link via email" message — so the flow still
 * works on day one without any Stripe setup.
 */
export function getStripePaymentLink(tier: TierId): string | null {
  const map: Record<TierId, string | undefined> = {
    starter: process.env.NEXT_PUBLIC_STRIPE_LINK_STARTER,
    growth: process.env.NEXT_PUBLIC_STRIPE_LINK_GROWTH,
    scale: process.env.NEXT_PUBLIC_STRIPE_LINK_SCALE,
    system_upgrade: process.env.NEXT_PUBLIC_STRIPE_LINK_SYSTEM_UPGRADE,
    scale_single: process.env.NEXT_PUBLIC_STRIPE_LINK_SCALE_SINGLE,
  };
  return map[tier] || null;
}

/** 50% deposit amount, formatted as a display string ($1,248.50 etc). */
export function getDepositAmount(tier: TierId): string {
  const priceStr = TIERS[tier].price.replace(/[^0-9.]/g, "");
  const full = parseFloat(priceStr);
  if (Number.isNaN(full)) return TIERS[tier].price;
  const half = full / 2;
  return half.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: half % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
