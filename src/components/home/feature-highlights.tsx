"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Target,
  Star,
  Mail,
  LayoutDashboard,
  TrendingUp,
  Share2,
  Zap,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/section";

const features = [
  {
    icon: Palette,
    title: "Premium Website Design",
    description:
      "Custom-built websites that make your business look established and trustworthy. No templates, no cookie-cutter layouts.",
  },
  {
    icon: Target,
    title: "Lead Capture That Works",
    description:
      "Strategic forms, CTAs, and conversion points placed where they matter most. Turn visitors into real business opportunities.",
  },
  {
    icon: Star,
    title: "Automated Review Collection",
    description:
      "Send review requests to happy customers automatically. Build the social proof that convinces new customers to choose you.",
  },
  {
    icon: Mail,
    title: "Email Notifications & Follow-Up",
    description:
      "Get notified instantly when a lead comes in. Set up automated follow-up sequences so no opportunity slips through.",
  },
  {
    icon: LayoutDashboard,
    title: "Business Dashboard",
    description:
      "See your leads, reviews, email activity, and conversion data in one clean interface. Know exactly what's driving results.",
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description:
      "Track lead sources, conversion rates, and review performance over time. Make smarter decisions with real data.",
  },
  {
    icon: Share2,
    title: "Social Integration",
    description:
      "Connect your social media presence. Track clicks, manage links, and understand how social drives business growth.",
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    description:
      "Set up triggers and automated actions that save you time. From lead follow-up to review requests — the system works while you don't.",
  },
];

export function FeatureHighlights() {
  return (
    <Section>
      <SectionHeader
        badge="What You Get"
        title="Everything your business needs to grow online"
        description="Each feature is designed around one goal: helping your business look better, convert more, and grow faster."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-1.5 font-semibold">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
