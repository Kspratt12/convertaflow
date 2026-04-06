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
    subtitle: "Build your premium online presence",
    description:
      "We design and build a high-end website that makes your business look established, trustworthy, and ready for growth. Your site is conversion-optimized from the start with lead capture, strong CTAs, and professional design.",
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Track",
    subtitle: "Capture leads and build trust",
    description:
      "Your dashboard starts collecting data the moment you launch. See every lead, send review requests to happy customers, and get instant email notifications so you never miss an opportunity.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Scale",
    subtitle: "Grow with systems that work",
    description:
      "With data flowing and trust building, you can scale with confidence. Advanced analytics, social integration, and automation workflows turn your business into a growth machine.",
  },
];

export function HowItWorksPreview() {
  return (
    <Section>
      <SectionHeader
        badge="How It Works"
        title="Three steps to a business that grows itself"
        description="Convertaflow takes you from an outdated online presence to a fully tracked, trust-building, growth-ready business system."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
          >
            <div className="mb-4 flex items-center gap-4">
              <span className="text-4xl font-bold text-primary/20">
                {step.step}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="mt-1 text-sm font-medium text-primary">
              {step.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>

            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 -right-4 text-muted-foreground/30">
                <ArrowRight className="h-6 w-6" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/how-it-works">
            Learn More About the Process
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
