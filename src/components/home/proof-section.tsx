"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Globe } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";

const metrics = [
  {
    icon: TrendingUp,
    value: "3.2x",
    label: "Average lead increase",
    description:
      "Businesses using Convertaflow see significantly more qualified leads compared to their previous website.",
  },
  {
    icon: Clock,
    value: "< 5 min",
    label: "Average response time",
    description:
      "Instant email notifications mean you can follow up with leads while they're still interested and browsing.",
  },
  {
    icon: Star,
    value: "84%",
    label: "Review request completion",
    description:
      "Automated review workflows make it easy for happy customers to leave feedback without friction.",
  },
  {
    icon: Globe,
    value: "100%",
    label: "Professional online presence",
    description:
      "Every Convertaflow client gets a website that looks as premium as the service they deliver.",
  },
];

const testimonials = [
  {
    quote:
      "We went from a basic WordPress site to something that actually impresses our clients. The dashboard alone saves us hours every week.",
    name: "Marcus Chen",
    role: "Owner, Prestige Home Services",
  },
  {
    quote:
      "The review system changed everything. We went from 12 Google reviews to over 80 in three months. New customers tell us that's why they called.",
    name: "Sarah Mitchell",
    role: "Director, Mitchell Dental Group",
  },
  {
    quote:
      "Finally, I can see exactly where our leads come from and what's converting. We stopped wasting money on things that weren't working.",
    name: "James Rodriguez",
    role: "Founder, Atlas Property Management",
  },
];

export function ProofSection() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        badge="Results"
        title="Real outcomes for real businesses"
        description="These are the kinds of results businesses see when they stop guessing and start using a system built for growth."
      />

      {/* Metrics */}
      <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="rounded-xl border bg-card p-6 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <metric.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary">{metric.value}</div>
            <div className="mt-1 text-sm font-semibold">{metric.label}</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="rounded-xl border bg-card p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.1 }}
          >
            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-4 border-t pt-4">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
