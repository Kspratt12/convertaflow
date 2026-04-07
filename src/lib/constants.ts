import type { TierId } from "./types";

export const SITE = {
  name: "Convertaflow",
  tagline: "A website that actually brings you customers",
  description:
    "Convertaflow builds custom websites and gets local businesses more customers every month. For plumbers, dentists, yoga instructors, real estate agents, and any local business that depends on showing up first.",
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
  /** What's included with the monthly fee — surfaced prominently on pricing */
  monthlyIncludes: string[];
  /** Update turnaround SLA, e.g. "Within 2 business days" */
  sla: string;
  highlighted: boolean;
  microcopy: string;
}

export const PLAN_SLUGS = {
  starter: "tier1",
  growth: "tier2",
  scale: "tier3",
  system_upgrade: "tier2-single",
  scale_single: "tier3-single",
} as const;

export const PLAN_FROM_SLUG: Record<string, TierId> = {
  // canonical
  tier1: "starter",
  tier2: "growth",
  tier3: "scale",
  "tier2-single": "system_upgrade",
  "tier3-single": "scale_single",
  // friendly aliases
  tier1_bundle: "starter",
  tier2_bundle: "growth",
  tier3_bundle: "scale",
  tier2_single: "system_upgrade",
  tier3_single: "scale_single",
  "system-upgrade": "system_upgrade",
};

export const TIERS: Record<TierId, TierConfig> = {
  starter: {
    id: "starter",
    name: "Just the Website",
    shortName: "Foundation",
    price: "$2,497",
    priceNote: "one-time build",
    monthly: "$79/mo",
    monthlyNote: "hosting, support & 2 updates/mo",
    monthlyRequired: false,
    description:
      "A custom website that makes your business look established and gives new customers a clear way to reach you. No templates, no DIY.",
    audience: "I just need a great-looking website",
    deliveryDays: "5–7 business days",
    revisions: 3,
    features: [
      "Custom website design (no templates)",
      "Looks great on phones and tablets",
      "Contact form that emails you instantly",
      "Hosting, SSL, and security included",
      "Easy for Google to find",
      "Fast loading on every device",
      "Visitor tracking so you know who's looking",
    ],
    monthlyIncludes: [
      "Hosting, SSL, daily backups",
      "Security updates and monitoring",
      "2 small content updates per month",
      "Email support (3 business day response)",
    ],
    sla: "Within 3 business days",
    highlighted: false,
    microcopy: "Cancel anytime. Your site stays yours.",
  },
  growth: {
    id: "growth",
    name: "Website + Growth Tools",
    shortName: "Growth",
    price: "$3,997",
    priceNote: "one-time build",
    monthly: "$199/mo",
    monthlyNote: "growth tools running 24/7 + unlimited updates",
    monthlyRequired: true,
    description:
      "Everything in Just the Website, plus the tools that turn website visitors into actual paying customers, automatically, without you lifting a finger.",
    audience: "I want my website to bring in customers",
    deliveryDays: "7–10 business days",
    revisions: 5,
    features: [
      "Everything in Just the Website",
      "Automatic follow-up emails to new inquiries",
      "Online booking and calendar built in",
      "Automatic review requests after each job",
      "Dashboard showing every inquiry and review",
      "Emails that follow up for you",
      "Priority email and chat support",
    ],
    monthlyIncludes: [
      "Everything in Just the Website",
      "Unlimited small content updates",
      "All growth tools running 24/7",
      "Priority support (2 business day response)",
    ],
    sla: "Within 2 business days",
    highlighted: true,
    microcopy: "Most popular. Cancel anytime.",
  },
  system_upgrade: {
    id: "system_upgrade",
    name: "Growth Tools Add-On",
    shortName: "System",
    price: "$1,997",
    priceNote: "one-time setup",
    monthly: "$199/mo",
    monthlyNote: "growth tools on your existing site",
    monthlyRequired: true,
    description:
      "Already have a website you like? We add the growth tools (inquiry capture, follow-ups, reviews, and a dashboard) without rebuilding anything.",
    audience: "I like my website, just add the tools",
    deliveryDays: "5–7 business days",
    revisions: 3,
    features: [
      "Inquiry forms added to your site",
      "Online booking and calendar",
      "Automatic follow-up emails",
      "Automatic review requests",
      "Dashboard for everything",
      "Visitor and inquiry tracking",
    ],
    monthlyIncludes: [
      "All growth tools running 24/7",
      "Unlimited small updates to the tools",
      "Email support (2 business day response)",
    ],
    sla: "Within 2 business days",
    highlighted: false,
    microcopy: "No rebuild required. Cancel anytime.",
  },
  scale_single: {
    id: "scale_single",
    name: "Everything Done For You · Add-On",
    shortName: "Engine",
    price: "$3,497",
    priceNote: "one-time setup",
    monthly: "$399/mo",
    monthlyNote: "full system + dedicated support",
    monthlyRequired: true,
    description:
      "Our complete system plugged into your existing website — social automation, full tracking, and a dedicated team handling the strategy.",
    audience: "I want everything, but keep my current site",
    deliveryDays: "7–10 business days",
    revisions: 5,
    features: [
      "Everything in Growth Tools Add-On",
      "Automatic social media posting",
      "Instagram and Facebook DM responses",
      "Track exactly where each customer came from",
      "Detailed performance reports",
      "Dedicated strategist on your account",
    ],
    monthlyIncludes: [
      "Everything in Growth Tools Add-On",
      "Unlimited updates with priority queue",
      "Dedicated strategist",
      "Same-day support (1 business day response)",
    ],
    sla: "Within 1 business day",
    highlighted: false,
    microcopy: "Everything done for you. No rebuild required.",
  },
  scale: {
    id: "scale",
    name: "Everything Done For You",
    shortName: "Scale",
    price: "$5,997",
    priceNote: "one-time build",
    monthly: "$399/mo",
    monthlyNote: "full system + dedicated support",
    monthlyRequired: true,
    description:
      "We build the website, set up every growth tool, run the social media, and handle the strategy. You focus on the work, we handle the rest.",
    audience: "I want my whole online presence handled",
    deliveryDays: "10–14 business days",
    revisions: 10,
    features: [
      "Everything in Website + Growth Tools",
      "Google Business Profile fully optimized",
      "Show up first in 'near me' searches",
      "Auto-text reply on missed calls",
      "Listed on 15+ local directories",
      "Automatic social media posting",
      "Instagram and Facebook DM responses",
      "Monthly 'what's working' performance report",
      "Dedicated strategist on your account",
    ],
    monthlyIncludes: [
      "Everything in Website + Growth Tools",
      "Unlimited updates with priority queue",
      "Google Business posts and review replies",
      "Local search ranking monitoring",
      "Monthly performance report",
      "Dedicated strategist",
      "Same-day support (1 business day response)",
    ],
    sla: "Within 1 business day",
    highlighted: false,
    microcopy: "Everything done for you. Cancel anytime.",
  },
};

