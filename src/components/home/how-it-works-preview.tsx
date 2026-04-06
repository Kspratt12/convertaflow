"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/section";

const steps = [
  {
    step: "01",
    icon: Rocket,
    title: "Launch",
    subtitle: "Build your premium presence",
    description:
      "We design and build a high-end website that makes your business look established from day one. Conversion-optimized with lead capture built in.",
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Track",
    subtitle: "Capture leads and build trust",
    description:
      "Your dashboard starts working immediately. See every lead, send review requests, and get instant notifications so you never miss an opportunity.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Scale",
    subtitle: "Grow with data and systems",
    description:
      "Advanced analytics, social integration, and automation workflows turn your business into a growth engine that runs even when you're not watching.",
  },
];

export function HowItWorksPreview() {
  return (
    <Section>
      <SectionHeader
        badge="Process"
        title="Three steps to a business that grows itself"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="relative rounded-2xl border border-border/60 bg-card p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[40px] font-extrabold leading-none text-primary/[0.08]">
                {step.step}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07]">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
            <p className="mt-0.5 text-[13px] font-medium text-primary">{step.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" className="gap-1.5" asChild>
          <Link href="/how-it-works">
            See the Full Process
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
