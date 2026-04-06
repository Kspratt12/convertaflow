export const SITE = {
  name: "Convertaflow",
  tagline: "Premium websites and growth systems for businesses",
  description:
    "Convertaflow helps businesses turn website visitors into real leads, reviews, and booked customers through premium web design, automated follow-up, and simple business dashboards.",
  url: "https://convertaflow.com",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Preview", href: "/preview" },
  { label: "Contact", href: "/contact" },
] as const;

export const TIERS = {
  starter: {
    id: "starter",
    name: "Premium Website",
    price: "$2,497",
    priceNote: "one-time setup",
    monthly: "$97/mo",
    monthlyNote: "hosting & support",
    description:
      "A high-end business website that makes you look established and converts visitors into real leads.",
    audience: "For businesses ready to look professional online",
    features: [
      "Custom premium website design",
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
    name: "Reviews + Dashboard",
    price: "$3,997",
    priceNote: "one-time setup",
    monthly: "$197/mo",
    monthlyNote: "platform access",
    description:
      "Everything in Premium Website plus automated review collection, lead tracking dashboard, and email follow-up that builds trust and keeps you in control.",
    audience: "For businesses ready to build trust and track results",
    features: [
      "Everything in Premium Website",
      "Business dashboard with lead tracking",
      "Google review request workflows",
      "Automated email notifications via Resend",
      "Lead source tracking",
      "Review collection analytics",
      "Activity timeline for all leads",
      "Email follow-up sequences",
      "Priority support",
    ],
    highlighted: true,
  },
  scale: {
    id: "scale",
    name: "Full Growth Bundle",
    price: "$5,997",
    priceNote: "one-time setup",
    monthly: "$297/mo",
    monthlyNote: "full platform",
    description:
      "The complete business growth system. Everything in Reviews + Dashboard plus advanced analytics, social media integration, automation flows, and a full command center for scaling your business.",
    audience: "For businesses ready to scale with systems",
    features: [
      "Everything in Reviews + Dashboard",
      "Advanced growth dashboard",
      "Social media integration and tracking",
      "Multi-channel lead attribution",
      "Advanced automation workflows",
      "Conversion funnel analytics",
      "Social post scheduling tools",
      "Custom reporting",
      "Dedicated account manager",
      "Quarterly strategy reviews",
    ],
    highlighted: false,
  },
} as const;

// TierId is now in types.ts for cleaner imports
