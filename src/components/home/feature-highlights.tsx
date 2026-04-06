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
    <section className="relative overflow-hidden bg-[#060613] py-16 text-white sm:py-20">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[15%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.10] blur-[130px]" />
        <div className="absolute bottom-[20%] right-[15%] h-[350px] w-[350px] rounded-full bg-[#3b82f6]/[0.08] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            Platform
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Everything your business needs{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              to grow online
            </span>
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-white/50 sm:mt-5">
            Each feature is built around one goal — helping you look better,
            convert more, and grow faster.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.05]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] transition-colors group-hover:bg-white/[0.10]">
                <feature.icon className="h-[18px] w-[18px] text-white/70" />
              </div>
              <h3 className="text-[14px] font-semibold leading-snug text-white/90">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/40">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
