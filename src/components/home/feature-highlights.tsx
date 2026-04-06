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
    title: "Premium Web Design",
    description: "Custom-built sites that make your business look established. No templates, no cookie-cutter layouts.",
  },
  {
    icon: Target,
    title: "Smart Lead Capture",
    description: "Strategic forms and CTAs placed where they convert. Turn visitors into real business opportunities.",
  },
  {
    icon: Star,
    title: "Review Automation",
    description: "Send review requests automatically after service. Build the social proof that wins new customers.",
  },
  {
    icon: Mail,
    title: "Instant Notifications",
    description: "Get notified the moment a lead comes in. Follow up while they're still browsing your site.",
  },
  {
    icon: LayoutDashboard,
    title: "Business Dashboard",
    description: "See leads, reviews, and email activity in one clean interface. Know what's driving results.",
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description: "Track lead sources, conversion rates, and trends over time. Make decisions with real data.",
  },
  {
    icon: Share2,
    title: "Social Integration",
    description: "Connect your profiles, track clicks, and understand how social drives business growth.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Set up triggers that run automatically — from follow-ups to review requests. Save hours every week.",
  },
];

export function FeatureHighlights() {
  return (
    <Section>
      <SectionHeader
        badge="Platform"
        title="Everything your business needs to grow online"
        description="Each feature is built around one goal — helping you look better, convert more, and grow faster."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="group rounded-2xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.04]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.07] transition-colors group-hover:bg-primary/10">
              <feature.icon className="h-[18px] w-[18px] text-primary" />
            </div>
            <h3 className="text-[14px] font-semibold leading-snug">{feature.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
