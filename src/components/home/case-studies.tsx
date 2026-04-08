"use client";

import { motion } from "framer-motion";
import { TrendingUp, Phone, Star } from "lucide-react";

const scenarios = [
  {
    icon: Phone,
    industry: "Plumbing / HVAC",
    headline: "Stop missing the calls you're already getting",
    body:
      "The average service business misses 4 in 10 calls. With Missed-Call Text-Back, every missed call gets an instant reply on your behalf so the customer doesn't go to the next shop on the list.",
    math: "Recover even 4 jobs/month and the system pays for itself 3x over.",
  },
  {
    icon: Star,
    industry: "Salons / Dentists / Med Spas",
    headline: "Turn happy customers into more 5-star reviews",
    body:
      "Most owners forget to ask for reviews. Our Auto Review System texts every customer right after their appointment. You go from a handful of reviews to dozens without lifting a finger.",
    math: "More reviews = more trust = more customers booking from Google.",
  },
  {
    icon: TrendingUp,
    industry: "Contractors / Solar / Roofing",
    headline: "Close more of the quotes you're already sending",
    body:
      "Most quotes go cold because nobody follows up. Our Quote-to-Close sequence sends a friendly nudge at day 1, 3, and 7 — the difference between a maybe and a yes.",
    math: "Even a 20% lift on a $10k quote pays for the whole system in one job.",
  },
];

export function CaseStudies() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-[#7c3aed]/[0.08] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#06b6d4]/[0.06] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            What This Looks Like
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Built to fix the leaks{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              costing you customers
            </span>
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
            Here&apos;s where Convertaflow makes the biggest difference for the kinds of businesses we build for.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.industry}
              className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 hover:border-white/[0.12] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "20px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/15 border border-[#7c3aed]/20">
                <s.icon className="h-5 w-5 text-[#06b6d4]" />
              </div>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-[#a3e635]">
                {s.industry}
              </p>
              <h3 className="mt-1 text-[16px] font-bold leading-snug text-white">
                {s.headline}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-white/60">
                {s.body}
              </p>
              <div className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2.5">
                <p className="text-[12px] leading-relaxed text-emerald-300">
                  {s.math}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
