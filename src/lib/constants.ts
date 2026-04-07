import type { TierId } from "./types";

export const SITE = {
  name: "Convertaflow",
  tagline: "Luxury websites and growth systems for businesses",
  description:
    "Convertaflow helps businesses look established, capture leads, and grow through premium web design, automated systems, and hands-on strategy.",
  url: "https://convertaflow.co",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Preview", href: "/preview" },
  { label: "Contact", href: "/contact" },
] as const;

export interface TierConfig {
  id: TierId;
  name: string;
  shortName: string;
  price: string;
  priceNote: string;
  monthly: string;
  monthlyNote: string;
  monthlyRequired: boolean;
  description: string;
  audience: string;
  deliveryDays: string;
  revisions: number;
  features: string[];
  highlighted: boolean;
  microcopy: string;
}

export const PLAN_SLUGS = {
  starter: "tier1",
  growth: "tier2",
  scale: "tier3",
  system_upgrade: "system-upgrade",
} as const;

export const PLAN_FROM_SLUG: Record<string, TierId> = {
  tier1: "starter",
  tier2: "growth",
  tier3: "scale",
  "system-upgrade": "system_upgrade",
};

export const TIERS: Record<TierId, TierConfig> = {
  starter: {
    id: "starter",
    name: "Luxury Website",
    shortName: "Foundation",
    price: "$2,497",
    priceNote: "one-time build",
    monthly: "$79/mo",
    monthlyNote: "optional hosting & support",
    monthlyRequired: false,
    description:
      "Look like the established business you are. A premium custom website that builds instant trust and turns visitors into inquiries.",
    audience: "Look professional, win trust on sight",
    deliveryDays: "5–7 business days",
    revisions: 3,
    features: [
      "Custom premium website design",
      "Mobile-optimized for every device",
      "Lead capture forms built in",
      "SEO-ready so clients find you",
      "Fast hosting & SSL included",
      "Contact form with instant email alerts",
      "Google Analytics to track visitors",
    ],
    highlighted: false,
    microcopy: "Your website is built once. No long-term contracts.",
  },
  growth: {
    id: "growth",
    name: "Website + Growth System",
    shortName: "Growth",
    price: "$3,997",
    priceNote: "one-time build",
    monthly: "$199/mo",
    monthlyNote: "systems run 24/7 for you",
    monthlyRequired: true,
    description:
      "The website brings them in. The system captures, follows up, and converts them — automatically. Most serious businesses start here.",
    audience: "Capture leads and convert them on autopilot",
    deliveryDays: "7–10 business days",
    revisions: 5,
    features: [
      "Everything in Luxury Website",
      "Capture every lead automatically",
      "Instant email follow-ups (no manual work)",
      "Online booking & calendar integration",
      "Automated review requests after service",
      "See every lead, call, and conversion",
      "Email sequences that nurture for you",
      "Priority support when you need it",
    ],
    highlighted: true,
    microcopy: "Built in days. Runs 24/7. Cancel anytime.",
  },
  system_upgrade: {
    id: "system_upgrade",
    name: "System Upgrade",
    shortName: "System",
    price: "$1,997",
    priceNote: "one-time setup",
    monthly: "$199/mo",
    monthlyNote: "system access & support",
    monthlyRequired: true,
    description:
      "Already have a website? Plug our growth system into your existing site. Lead capture, follow-ups, reviews, dashboard — no rebuild required.",
    audience: "Add our system to your existing site",
    deliveryDays: "5–7 business days",
    revisions: 3,
    features: [
      "Lead capture integration",
      "Booking & calendar connection",
      "Automated email follow-ups",
      "Review request system",
      "Dashboard access",
      "Basic analytics",
    ],
    highlighted: false,
    microcopy: "No rebuild required. Cancel anytime.",
  },
  scale: {
    id: "scale",
    name: "Full Growth Engine",
    shortName: "Scale",
    price: "$5,997",
    priceNote: "one-time build",
    monthly: "$399/mo",
    monthlyNote: "full automation + strategy",
    monthlyRequired: true,
    description:
      "Your business runs like a machine. Every lead tracked, every channel automated, every decision backed by data. We handle the strategy so you focus on delivery.",
    audience: "Automate everything, scale without hiring",
    deliveryDays: "10–14 business days",
    revisions: 10,
    features: [
      "Everything in Growth System",
      "Social media automated posting",
      "Instagram & ManyChat lead flows",
      "Know exactly where every lead comes from",
      "Multi-channel conversion tracking",
      "Ongoing optimization by our team",
      "Custom reports tailored to your goals",
      "Dedicated strategist in your corner",
    ],
    highlighted: false,
    microcopy: "No contracts. Cancel anytime.",
  },
};
