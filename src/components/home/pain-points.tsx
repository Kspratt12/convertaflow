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
      "Potential customers judge your business in seconds. An old or generic website makes you look less established than you are — and sends leads to competitors who look sharper.",
  },
  {
    icon: AlertTriangle,
    title: "You're losing leads silently",
    description:
      "Visitors land on your site, browse around, and leave without a trace. No lead capture, no follow-up, no second chance. Every day without a system is money walking out the door.",
  },
  {
    icon: Clock,
    title: "Follow-up is too slow",
    description:
      "When a lead does reach out, most businesses take hours or days to respond. Speed matters — the first business to reply wins the majority of new customers.",
  },
  {
    icon: MessageSquareOff,
    title: "Reviews are underused",
    description:
      "Happy customers rarely leave reviews on their own. Without a simple review request system, you're missing the most powerful trust-building tool available.",
  },
  {
    icon: HelpCircle,
    title: "You don't know what's working",
    description:
      "Where are your leads coming from? Which pages convert? What's your response time? Without a dashboard, you're making business decisions blind.",
  },
];

export function PainPoints() {
  return (
    <Section>
      <SectionHeader
        badge="The Problem"
        title="Most business websites are costing their owners money"
        description="These are the gaps that hold businesses back — and the exact problems Convertaflow was built to solve."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pains.map((pain, i) => (
          <motion.div
            key={pain.title}
            className="group relative rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <pain.icon className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{pain.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {pain.description}
            </p>
          </motion.div>
        ))}

        {/* Solution card */}
        <motion.div
          className="relative rounded-xl border-2 border-primary bg-primary/5 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ArrowRight className="h-5 w-5 text-primary-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Convertaflow fixes all of this
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A premium website, lead capture, review system, email automation, and
            a simple dashboard — all built into one growth platform for your
            business.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
