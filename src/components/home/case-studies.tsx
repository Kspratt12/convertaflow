"use client";

import { motion } from "framer-motion";
import { TrendingUp, Phone, Star } from "lucide-react";

const scenarios = [
  {
    icon: Phone,
    industry: "Cleaning Businesses",
    headline: "Stop losing clients who DM and never hear back",
    body:
      "You're busy cleaning houses. A potential customer messages you on Facebook asking for a quote. By the time you reply 3 hours later, they already booked someone else. With online booking, they schedule themselves instantly.",
    math: "Even 2 extra bookings a month pays for the entire system.",
  },
  {
    icon: Star,
    industry: "Bakeries / Custom Cakes",
    headline: "Turn your Instagram followers into paying orders",
    body:
      "Your cake photos get likes and comments, but ordering still means DMing you and going back and forth on flavors, sizes, and dates. A website with an order form turns followers into customers without the DM chains.",
    math: "More orders with less back and forth. Your time goes back to baking.",
  },
  {
    icon: TrendingUp,
    industry: "Detailing / Pressure Washing",
    headline: "Show up on Google when people search near me",
    body:
      "Right now someone in your area is searching 'pressure washing near me' or 'mobile detailing near me' and finding your competitors because they have a website and you don't. A site with your reviews and booking changes that overnight.",
    math: "One extra job a week from Google search pays for the system 4x over.",
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
