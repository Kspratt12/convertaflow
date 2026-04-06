"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Globe } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";

const metrics = [
  {
    icon: TrendingUp,
    value: "3.2x",
    label: "More qualified leads",
    description: "Businesses see significantly more leads within the first 90 days of launching with Convertaflow.",
  },
  {
    icon: Clock,
    value: "< 5 min",
    label: "Response time",
    description: "Instant notifications mean you follow up while leads are still browsing — before competitors even check email.",
  },
  {
    icon: Star,
    value: "84%",
    label: "Review completion rate",
    description: "Automated workflows make it effortless for happy customers to leave reviews without any friction.",
  },
  {
    icon: Globe,
    value: "100%",
    label: "Professional presence",
    description: "Every client launches with a website that looks as premium as the work they deliver.",
  },
];

const testimonials = [
  {
    quote: "We went from a basic WordPress site to something that genuinely impresses our clients. The dashboard alone saves us hours every week.",
    name: "Marcus Chen",
    role: "Prestige Home Services",
    metric: "47 leads in first month",
  },
  {
    quote: "The review system changed everything. We went from 12 Google reviews to over 80 in three months. New customers tell us that's why they called.",
    name: "Sarah Mitchell",
    role: "Mitchell Dental Group",
    metric: "568% review increase",
  },
  {
    quote: "I can finally see exactly where our leads come from and what's converting. We cut our ad spend by 40% and got better results.",
    name: "James Rodriguez",
    role: "Atlas Property Management",
    metric: "40% lower acquisition cost",
  },
];

export function ProofSection() {
  return (
    <Section className="bg-muted/20">
      <SectionHeader
        badge="Results"
        title="Real outcomes for real businesses"
        description="These results come from businesses that stopped guessing and started using a system built for growth."
      />

      {/* Metrics */}
      <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="rounded-2xl border border-border/60 bg-card p-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <metric.icon className="h-5 w-5 text-primary/60" />
            <div className="mt-3 text-3xl font-extrabold tracking-tight text-primary">
              {metric.value}
            </div>
            <div className="mt-1 text-sm font-semibold">{metric.label}</div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="flex flex-col rounded-2xl border border-border/60 bg-card p-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <div>
                <div className="text-[13px] font-semibold">{t.name}</div>
                <div className="text-[12px] text-muted-foreground">{t.role}</div>
              </div>
              <span className="rounded-full bg-primary/[0.07] px-2.5 py-1 text-[11px] font-semibold text-primary">
                {t.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
