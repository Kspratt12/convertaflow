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
    monthlyNote: "OPTIONAL: hosting, support & 2 updates/mo",
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
      "SSL and security setup included",
      "Easy for Google to find",
      "Fast loading on every device",
      "Visitor tracking so you know who's looking",
      "Connect your domain (we walk you through it)",
      "Social media links built in",
    ],
    monthlyIncludes: [
      "Hosting, SSL, daily backups",
      "Security updates and monitoring",
      "2 small content updates per month",
      "Email support (3 business day response)",
    ],
    sla: "Within 3 business days",
    highlighted: false,
    microcopy: "Skip the monthly fee or add it anytime. Your site is yours.",
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
      "Everything in Just the Website, plus three tools that catch and convert your customers automatically. Pick extras in your portal and we build them for you.",
    audience: "I want my website to bring in customers",
    deliveryDays: "7–10 business days",
    revisions: 5,
    features: [
      "Everything in Just the Website",
      "Google Reviews automation (auto-request + branded emails)",
      "Lead capture forms with instant email alerts",
      "Email follow-up sequences (we write them, we run them)",
      "Branded confirmation emails to customers",
      "Pick extras in your portal: booking, custom forms, newsletter, more",
      "Dashboard showing every inquiry and review",
      "Priority email and chat support",
    ],
    monthlyIncludes: [
      "Everything in Just the Website",
      "Unlimited small content updates",
      "All growth tools running 24/7",
      "Custom extras quoted from your portal request form",
      "Priority support (2 business day response)",
    ],
    sla: "Within 2 business days",
    highlighted: true,
    microcopy: "Most popular. Cancel anytime.",
  },
  system_upgrade: {
    id: "system_upgrade",
    name: "Website + Growth Tools",
    shortName: "Growth",
    price: "$1,997",
    priceNote: "one-time setup, no website rebuild",
    monthly: "$199/mo",
    monthlyNote: "growth tools running 24/7 on your existing site",
    monthlyRequired: true,
    description:
      "You already have a website you like. We plug the same growth tools into your current site, no rebuild, no downtime, no DIY.",
    audience: "I have a site, just give me the tools",
    deliveryDays: "5–7 business days",
    revisions: 3,
    features: [
      "Google Reviews automation (auto-request + branded emails)",
      "Lead capture forms with instant email alerts",
      "Email follow-up sequences (we write them, we run them)",
      "Branded confirmation emails to customers",
      "Pick extras in your portal: booking, custom forms, newsletter, more",
      "Dashboard showing every inquiry and review",
      "Priority email and chat support",
    ],
    monthlyIncludes: [
      "All growth tools running 24/7",
      "Unlimited small updates to the tools",
      "Custom extras quoted from your portal request form",
      "Priority support (2 business day response)",
    ],
    sla: "Within 2 business days",
    highlighted: false,
    microcopy: "No rebuild required. Cancel anytime.",
  },
  scale_single: {
    id: "scale_single",
    name: "Everything Done For You",
    shortName: "Scale",
    price: "$3,497",
    priceNote: "one-time setup, no website rebuild",
    monthly: "$399/mo",
    monthlyNote: "full system + custom build + dedicated support",
    monthlyRequired: true,
    description:
      "You already have a website. We plug everything into it: all the growth tools, plus a custom build catered to your business. Plumber, dentist, yoga instructor, real estate, lawyer, hair stylist. We meet you where you are.",
    audience: "I have a site, build me a custom system on top",
    deliveryDays: "7–10 business days",
    revisions: 5,
    features: [
      "All growth tools running 24/7 on your existing site",
      "✨ Custom Build, you tell us what (we meet you where you are)",
      "Custom Business Dashboard built for your workflow",
      "SMS / Missed-Call Recovery (auto-text customers when you miss a call)",
      "Customer CRM (track every customer from inquiry to repeat business)",
      "Google Business Profile fully optimized + weekly posts",
      "Local SEO (show up first in 'near me' searches)",
      "Auto Review System (auto-request + reply to every review)",
      "Listed on 15+ local directories (Yelp, Angi, BBB, more)",
      "Monthly Performance Report (what's working, what's not)",
      "Dedicated strategist on your account",
    ],
    monthlyIncludes: [
      "Everything in Growth Tools",
      "Custom build maintained and updated as you grow",
      "Unlimited updates with priority queue",
      "SMS / Missed-Call Recovery running 24/7",
      "Google Business posts and review replies",
      "Monthly performance report",
      "Dedicated strategist",
      "Same-day support (1 business day response)",
    ],
    sla: "Within 1 business day",
    highlighted: false,
    microcopy: "Built around your business. No rebuild required.",
  },
  scale: {
    id: "scale",
    name: "Everything Done For You",
    shortName: "Scale",
    price: "$5,997",
    priceNote: "one-time build",
    monthly: "$399/mo",
    monthlyNote: "full system + custom build + dedicated support",
    monthlyRequired: true,
    description:
      "Everything in Growth Tools, plus one custom system from our menu. Built to do the job of an employee you don't have time to hire. Missed-call recovery, review bot, follow-up sequences, and more. You pick, we build, it runs on its own.",
    audience: "I want everything, plus something custom built for my business",
    deliveryDays: "10–14 business days",
    revisions: 10,
    features: [
      "Everything in Website + Growth Tools",
      "✨ One custom system built for your business (pick from our menu of 6)",
      "Missed-Call Text-Back (auto-text every caller you miss)",
      "Customer CRM (every customer from first call to repeat business)",
      "Google Business Profile + Local SEO (show up first nearby)",
      "Auto Review System (request + reply to every review)",
      "Custom dashboard built around your workflow",
      "Dedicated strategist + monthly results report",
    ],
    monthlyIncludes: [
      "Everything in Website + Growth Tools",
      "Your custom system maintained and tuned as you grow",
      "Unlimited updates with priority queue",
      "Listed on 15+ local directories (Yelp, Angi, BBB, more)",
      "Weekly Google Business posts and review replies",
      "Monthly performance report and strategy call",
      "Same-day support (1 business day response)",
    ],
    sla: "Within 1 business day",
    highlighted: false,
    microcopy: "Built around your business. Cancel anytime.",
  },
};

