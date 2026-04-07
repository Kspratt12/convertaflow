"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Mail,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

/* What's included in every Convertaflow plan — honest, capability-based copy
 * (no fabricated metrics, no fake customer quotes). Replace with real
 * testimonials once you have them, and real benchmark data once you can
 * measure it across your customer base. */

const pillars = [
  {
    icon: Globe,
    title: "Premium custom design",
    body: "Every site is built from scratch around your brand. No templates, no cookie-cutter layouts. Mobile-optimized, fast-loading, and styled to make your business look like the leader in your space.",
  },
  {
    icon: Zap,
    title: "Built to convert",
    body: "Clear contact forms, strong calls to action, and a hero that grabs attention. We don't build websites that just look pretty and sit there. We build the ones that actually bring in customers.",
  },
  {
    icon: ShieldCheck,
    title: "Hands-off after launch",
    body: "Hosting, security, updates, and support are handled. You focus on running your business; we handle everything that keeps your site fast, secure, and online.",
  },
];

const promises = [
  { icon: Users, label: "Strategic lead capture", value: "Built in" },
  { icon: Mail, label: "Branded email system", value: "Included" },
  { icon: Star, label: "Review request tools", value: "Growth+" },
  { icon: TrendingUp, label: "Lead tracking dashboard", value: "Growth+" },
];

export function ProofSection() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[30%] left-[20%] h-[200px] w-[200px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#06b6d4]/[0.06] blur-[40px] sm:blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] h-[180px] w-[180px] sm:h-[350px] sm:w-[350px] rounded-full bg-[#7c3aed]/[0.06] blur-[40px] sm:blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            <Sparkles className="h-3 w-3" />
            What you get
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Built to look premium.{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Built to actually work.
            </span>
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
            Every Convertaflow build comes with the same core foundation. Pick the plan that matches how much growth system you need on top.
          </p>
        </div>

        {/* Capability pillars */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "20px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#06b6d4]/10 border border-white/[0.06]">
                <pillar.icon className="h-4 w-4 text-[#06b6d4]" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-white/90">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55 sm:text-[14px]">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What's included strip */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {promises.map((p, i) => (
            <motion.div
              key={p.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "20px" }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <p.icon className="mx-auto h-5 w-5 text-[#06b6d4]/60" />
              <div className="mt-2 text-[15px] font-bold text-white/90">{p.value}</div>
              <div className="mt-1 text-[12px] font-medium text-white/50">{p.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
