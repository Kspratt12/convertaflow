"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Eye,
  MessageSquareOff,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const pains = [
  {
    icon: Eye,
    title: "Your website looks outdated",
    description:
      "Visitors judge your business in under 3 seconds. A dated website sends them straight to a competitor who looks sharper.",
  },
  {
    icon: AlertTriangle,
    title: "Leads leave without a trace",
    description:
      "No capture forms, no follow-up, no second chance. Every day without a system is revenue walking out the door.",
  },
  {
    icon: Clock,
    title: "Follow-up takes too long",
    description:
      "The first business to respond wins 78% of the time. If you're taking hours, someone else is closing the deal.",
  },
  {
    icon: MessageSquareOff,
    title: "Reviews go uncollected",
    description:
      "Happy customers don't leave reviews on their own. Without a system, your strongest trust signal goes to waste.",
  },
  {
    icon: HelpCircle,
    title: "No visibility into what works",
    description:
      "Where do your best leads come from? Which pages convert? Without data, every marketing dollar is a guess.",
  },
];

export function PainPoints() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] right-[20%] h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full bg-red-500/[0.04] blur-[60px] sm:blur-[120px]" />
        <div className="absolute bottom-[20%] left-[15%] h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full bg-[#7c3aed]/[0.05] blur-[60px] sm:blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <span className="mb-4 inline-block rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-400/80 sm:mb-5">
            The Problem
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Most business websites{" "}
            <span className="text-red-400/80">cost their owners money</span>
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/40 sm:mt-4 sm:text-[16px]">
            These gaps hold businesses back. Convertaflow was built to close every one of them.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-200 hover:bg-white/[0.05] sm:p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "20px" }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/[0.1] sm:mb-4">
                <pain.icon className="h-[18px] w-[18px] text-red-400" />
              </div>
              <h3 className="text-[14px] font-semibold leading-snug text-white/90 sm:text-[15px]">{pain.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/40 sm:mt-2">
                {pain.description}
              </p>
            </motion.div>
          ))}

          {/* Solution card */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] p-5 text-white shadow-lg shadow-purple-500/15 sm:p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "20px" }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 sm:mb-4">
              <Sparkles className="h-[18px] w-[18px] text-white" />
            </div>
            <h3 className="text-[14px] font-semibold leading-snug sm:text-[15px]">
              That&apos;s why we built Convertaflow
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/80 sm:mt-2">
              Luxury website. Lead capture. Review system. Booking integration.
              Email follow-up. Delivered in days with a dedicated team behind it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
