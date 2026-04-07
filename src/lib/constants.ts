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

export const TIERS: Record<TierId, TierConfig> = {
  starter: {
    id: "starter",
    name: "Luxury Website",
    shortName: "Foundation",
    price: "$2,497",
    priceNote: "one-time build",
    monthly: "$79/mo",
    monthlyNote: "optional support",
    monthlyRequired: false,
    description:
      "A high-end custom website that makes your business look world-class and converts visitors into leads from day one.",
    audience: "For businesses ready to look established",
    deliveryDays: "5–7 business days",
    revisions: 3,
    features: [
      "Custom luxury website design",
      "Mobile-optimized responsive layout",
      "Lead capture forms & CTAs",
      "SEO-ready page structure",
      "Fast hosting & SSL included",
      "Contact form with email alerts",
      "Google Analytics integration",
    ],
    highlighted: false,
    microcopy: "Website is built once. Monthly support is optional.",
  },
  growth: {
    id: "growth",
    name: "Website + Lead & Automation System",
    shortName: "Growth",
    price: "$3,997",
    priceNote: "one-time build",
    monthly: "$199/mo",
    monthlyNote: "growth system access",
    monthlyRequired: true,
    description:
      "Everything in Luxury Website plus a full lead tracking dashboard, automated email notifications, booking integration, and review request system.",
    audience: "For businesses ready to capture and convert",
    deliveryDays: "7–10 business days",
    revisions: 5,
    features: [
      "Everything in Luxury Website",
      "Lead tracking dashboard",
      "Automated email notifications",
      "Booking & calendar integration",
      "Review request system",
      "Activity timeline & basic analytics",
      "Email follow-up sequences",
      "Priority support",
    ],
    highlighted: true,
    microcopy: "Built in days. Systems run 24/7.",
  },
  scale: {
    id: "scale",
    name: "Full Growth & Automation Engine",
    shortName: "Scale",
    price: "$5,997",
    priceNote: "one-time build",
    monthly: "$399/mo",
    monthlyNote: "full system access",
    monthlyRequired: true,
    description:
      "The complete growth engine. Everything in Growth plus social media automation, Instagram/ManyChat workflows, advanced analytics, and ongoing optimization support.",
    audience: "For businesses ready to scale with systems",
    deliveryDays: "10–14 business days",
    revisions: 10,
    features: [
      "Everything in Growth System",
      "Social media automation",
      "Instagram & ManyChat workflows",
      "Advanced conversion analytics",
      "Multi-channel lead attribution",
      "Ongoing optimization support",
      "Custom reporting",
      "Dedicated strategy support",
    ],
    highlighted: false,
    microcopy: "Cancel anytime on monthly systems.",
  },
};
