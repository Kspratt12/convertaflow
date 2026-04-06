"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Star, Rocket, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";

const tiers = [
  {
    icon: Globe,
    name: "Premium Website",
    tagline: "Look established. Start converting.",
    description:
      "A high-end business website designed to make you look professional and turn visitors into leads from day one.",
    features: [
      "Custom premium design",
      "Lead capture forms",
      "Mobile optimized",
      "SEO-ready structure",
      "Fast modern hosting",
    ],
    highlighted: false,
  },
  {
    icon: Star,
    name: "Reviews + Dashboard",
    tagline: "Build trust. Track results.",
    description:
      "Everything in Premium Website plus automated review requests, email notifications, and a dashboard to track every lead.",
    features: [
      "Everything in Tier 1",
      "Google review workflows",
      "Lead tracking dashboard",
      "Email follow-up automation",
      "Activity timeline",
    ],
    highlighted: true,
  },
  {
    icon: Rocket,
    name: "Full Growth Bundle",
    tagline: "Scale your entire business.",
    description:
      "The complete growth system. Advanced dashboards, social integration, automation, and full visibility into what drives results.",
    features: [
      "Everything in Tier 2",
      "Advanced analytics",
      "Social media integration",
      "Automation workflows",
      "Dedicated strategy support",
    ],
    highlighted: false,
  },
];

export function TierPreview() {
  return (
    <Section className="bg-muted/30">
      <SectionHeader
        badge="Three Tiers"
        title="Choose the level of growth your business needs"
        description="Start with a premium foundation, then add trust-building and growth tools as you scale."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-8 transition-shadow hover:shadow-xl",
              tier.highlighted &&
                "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {tier.highlighted && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}

            <div
              className={cn(
                "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
                tier.highlighted
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <tier.icon className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold">{tier.name}</h3>
            <p className="mt-1 text-sm font-medium text-primary">
              {tier.tagline}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {tier.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="mt-8"
              variant={tier.highlighted ? "default" : "outline"}
              asChild
            >
              <Link href="/pricing">
                View Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
