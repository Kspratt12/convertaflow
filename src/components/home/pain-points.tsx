"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Eye,
  MessageSquareOff,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/section";

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
    <Section>
      <SectionHeader
        badge="The Problem"
        title="Most business websites cost their owners money"
        description="These gaps hold businesses back. Convertaflow was built to close every one of them."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pains.map((pain, i) => (
          <motion.div
            key={pain.title}
            className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-black/[0.03]"
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

        <motion.div
          className="rounded-2xl border-2 border-primary/30 bg-primary/[0.03] p-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <ArrowRight className="h-[18px] w-[18px] text-primary" />
          </div>
          <h3 className="text-[15px] font-semibold leading-snug text-primary">
            Convertaflow fixes all of this
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            One platform. Premium website, lead capture, review automation,
            email follow-up, and a dashboard that shows you everything.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
