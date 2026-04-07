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
  { label: "Get Customers", href: "/local-customer-engine" },
  { label: "How It Works", href: "/how-it-works" },
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
      "Automatic social media posting",
      "Instagram and Facebook DM responses",
      "Track exactly where each customer came from",
      "Detailed reports tailored to your goals",
      "Ongoing optimization by our team",
      "Dedicated strategist on your account",
    ],
    monthlyIncludes: [
      "Everything in Website + Growth Tools",
      "Unlimited updates with priority queue",
      "Social media automation running 24/7",
      "Dedicated strategist",
      "Same-day support (1 business day response)",
    ],
    sla: "Within 1 business day",
    highlighted: false,
    microcopy: "Everything done for you. Cancel anytime.",
  },
};

/* ──────────────────────────────────────────────────────────────────
 * The Local Customer Engine
 * ──────────────────────────────────────────────────────────────────
 * Standalone offer that bolts on top of any website tier (or works
 * alone for businesses that already have a website). The pitch is
 * outcome-focused: 'we get you more local customers every month.'
 * Targeted at home service businesses, professional practices,
 * and any local business that depends on showing up first when
 * someone searches their service near them.
 */

export interface EngineTier {
  id: "engine-setup" | "engine-monthly" | "engine-pro";
  name: string;
  price: string;
  priceNote: string;
  cadence: "one-time" | "monthly";
  audience: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const ENGINE_TIERS: EngineTier[] = [
  {
    id: "engine-setup",
    name: "Setup Only",
    price: "$1,497",
    priceNote: "one-time setup",
    cadence: "one-time",
    audience: "Want the whole system built once and yours forever",
    description:
      "We set up everything that gets you more local customers, hand it to you, and you run it from there. No monthly fee.",
    features: [
      "Google Business Profile fully optimized",
      "Local SEO so you show up in 'near me' searches",
      "Listed on 15+ local directories (Yelp, Angi, BBB, more)",
      "Inquiry-to-text instant alerts on your phone",
      "Auto-text reply on missed calls",
      "30-day support after setup",
    ],
    cta: "Get the Setup",
    highlighted: false,
  },
  {
    id: "engine-monthly",
    name: "Local Customer Engine",
    price: "$1,497",
    priceNote: "one-time setup, then $497/mo",
    cadence: "monthly",
    audience: "Want it set up and managed for you, every month",
    description:
      "Everything in Setup, plus we run it for you. Weekly Google posts, every review replied to, monthly performance report, and ongoing tweaks to keep you ranking.",
    features: [
      "Everything in Setup Only",
      "Weekly Google Business posts (we write them)",
      "Every review replied to within 24 hours",
      "Monthly 'what's working' performance report",
      "Local search ranking monitoring",
      "Ongoing optimization to stay on top",
      "Cancel anytime, no contracts",
    ],
    cta: "Start Getting Customers",
    highlighted: true,
  },
  {
    id: "engine-pro",
    name: "Local Customer Engine PRO",
    price: "$1,497",
    priceNote: "one-time setup, then $997/mo",
    cadence: "monthly",
    audience: "Want us to run your Google Ads too",
    description:
      "Everything in the Local Customer Engine, plus we manage your Google Ads campaigns. You set the ad budget, we run the strategy.",
    features: [
      "Everything in Local Customer Engine",
      "Google Ads campaign setup and management",
      "Custom landing page for ad traffic",
      "Weekly ad spend optimization",
      "Detailed conversion tracking",
      "Dedicated strategist on your account",
      "Ad spend billed separately",
    ],
    cta: "Go PRO",
    highlighted: false,
  },
];

/** What the Engine actually does, written for the customer in plain English. */
export const ENGINE_PILLARS = [
  {
    title: "Show up first when people search",
    body: "When someone Googles 'plumber near me' or 'yoga studio in [your city],' they'll find you before your competitors. We make sure your Google Business Profile, your website, and 15+ local directories all say the same thing about your business.",
  },
  {
    title: "Catch every call, even the missed ones",
    body: "When someone fills out your contact form, you get a text in 5 seconds. When you miss a call (because you're under a sink or in a class), the system automatically texts them back. About 30% of those missed calls turn into actual jobs.",
  },
  {
    title: "Build the reviews that win new customers",
    body: "We reply to every review you get within 24 hours, and we ask happy customers for new ones automatically. Your Google rating goes up, your number of reviews goes up, and that's the trust signal that wins you new business.",
  },
  {
    title: "Know exactly what's working",
    body: "Once a month you get a one-page report: how many new inquiries you got, where they came from, what your competitors are doing, and what we recommend you do next month. No spreadsheets, no jargon, just answers.",
  },
];

/** The 'why this matters' math, written for skeptics. */
export const ENGINE_PROOF = [
  {
    metric: "Faster",
    label: "First to respond wins almost every time",
    body: "78% of customers go with whoever calls them back first. Our system gets you there in under 5 seconds.",
  },
  {
    metric: "More",
    label: "Calls captured, not lost",
    body: "An average local business misses 1 in 3 calls. We turn those misses into customers automatically.",
  },
  {
    metric: "Higher",
    label: "Google ranking, more inquiries",
    body: "Businesses with optimized Google Business Profiles get 7x more clicks than those without.",
  },
];
