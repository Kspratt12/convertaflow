"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Globe } from "lucide-react";

const metrics = [
  { icon: TrendingUp, value: "3.2x", label: "More qualified leads" },
  { icon: Clock, value: "< 5 min", label: "Response time" },
  { icon: Star, value: "84%", label: "Review completion" },
  { icon: Globe, value: "100%", label: "Professional presence" },
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
    metric: "40% lower cost per lead",
  },
];

export function ProofSection() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[30%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#06b6d4]/[0.06] blur-[140px]" />
        <div className="absolute bottom-[20%] right-[20%] h-[350px] w-[350px] rounded-full bg-[#7c3aed]/[0.06] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            Results
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Numbers that speak{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              louder than promises
            </span>
          </h2>
        </div>

        {/* Metrics row */}
        <div className="mb-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <metric.icon className="mx-auto h-5 w-5 text-[#06b6d4]/60" />
              <div className="mt-2 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="mt-1 text-[13px] font-medium text-white/60">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-white/60">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div>
                  <div className="text-[13px] font-semibold text-white/90">{t.name}</div>
                  <div className="text-[12px] text-white/40">{t.role}</div>
                </div>
                <span className="rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/20 px-2.5 py-1 text-[11px] font-semibold text-[#06b6d4]">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
