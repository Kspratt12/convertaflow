import type { TierId } from "./types";

export const SITE = {
  name: "Convertaflow",
  tagline: "Luxury websites and growth systems for businesses",
  description:
    "Convertaflow helps businesses look established, capture leads, and grow through premium web design, automated systems, and hands-on strategy.",
  url: "https://convertaflow.com",
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
  description: string;
  audience: string;
  deliveryDays: string;
  revisions: number;
  features: string[];
  highlighted: boolean;
}

export const TIERS: Record<TierId, TierConfig> = {
  starter: {
    id: "starter",
    name: "Luxury Website Design",
    shortName: "Foundation",
    price: "$2,497",
    priceNote: "one-time",
    monthly: "$97/mo",
    monthlyNote: "hosting & support",
    description:
      "A high-end custom website designed to make your business look established, capture leads from day one, and leave a lasting impression on every visitor.",
    audience: "For businesses ready to look world-class online",
    deliveryDays: "5–7 business days",
    revisions: 3,
    features: [
      "Custom luxury website design",
      "Mobile-optimized responsive layout",
      "Lead capture forms and CTAs",
      "SEO-ready page structure",
      "Fast hosting on modern infrastructure",
      "Contact form with email notifications",
      "Google Analytics integration",
      "SSL security included",
    ],
    highlighted: false,
  },
  growth: {
    id: "growth",
    name: "Website + Business Systems",
    shortName: "Growth",
    price: "$3,997",
    priceNote: "one-time",
    monthly: "$197/mo",
    monthlyNote: "systems & support",
    description:
      "Everything in Foundation plus booking integration, automated email notifications, review request system, and a simple dashboard to track leads and activity.",
    audience: "For businesses ready to capture and convert",
    deliveryDays: "7–10 business days",
    revisions: 5,
    features: [
      "Everything in Luxury Website Design",
      "Booking & calendar integration",
      "Automated email notifications",
      "Google review request system",
      "Lead tracking dashboard",
      "Activity timeline and analytics",
      "Email follow-up sequences",
      "Priority support",
    ],
    highlighted: true,
  },
  scale: {
    id: "scale",
    name: "Full Growth System",
    shortName: "Scale",
    price: "$5,997",
    priceNote: "one-time",
    monthly: "$297/mo",
    monthlyNote: "full system access",
    description:
      "The complete business growth system. Everything in Growth plus social media automation, Instagram/ManyChat workflow support, advanced analytics, and dedicated strategy.",
    audience: "For businesses ready to scale with systems",
    deliveryDays: "10–14 business days",
    revisions: 10,
    features: [
      "Everything in Website + Systems",
      "Social media automation support",
      "Instagram & ManyChat workflows",
      "Advanced conversion analytics",
      "Multi-channel lead attribution",
      "Social post scheduling",
      "Custom reporting",
      "Dedicated strategy support",
      "Quarterly growth reviews",
    ],
    highlighted: false,
  },
};
