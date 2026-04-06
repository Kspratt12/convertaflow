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
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            The Problem
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Most business websites cost their owners money
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            These gaps hold businesses back. Convertaflow was built to close every one of them.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-md"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/[0.08]">
                <pain.icon className="h-[18px] w-[18px] text-red-500/80" />
              </div>
              <h3 className="text-[15px] font-semibold leading-snug">{pain.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pain.description}
              </p>
            </motion.div>
          ))}

          {/* Solution card */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] p-6 text-white shadow-lg shadow-purple-500/15"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
              <Sparkles className="h-[18px] w-[18px] text-white" />
            </div>
            <h3 className="text-[15px] font-semibold leading-snug">
              Convertaflow fixes all of this
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              One platform. Premium website, lead capture, review automation,
              email follow-up, and a dashboard that shows you everything.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
