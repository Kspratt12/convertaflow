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
    tagline: "Look established from day one",
    price: "$2,497",
    note: "one-time + $97/mo",
    description:
      "A custom, conversion-optimized website that makes your business look as professional as the work you do.",
    features: [
      "Custom premium design",
      "Lead capture & contact forms",
      "Mobile-first responsive",
      "SEO-ready structure",
      "Fast modern hosting",
    ],
    highlighted: false,
  },
  {
    icon: Star,
    name: "Reviews + Dashboard",
    tagline: "Build trust and track everything",
    price: "$3,997",
    note: "one-time + $197/mo",
    description:
      "Everything in Tier 1 plus automated review requests, lead tracking dashboard, and email follow-up.",
    features: [
      "Everything in Premium Website",
      "Automated review workflows",
      "Lead tracking dashboard",
      "Email follow-up via Resend",
      "Activity timeline & analytics",
    ],
    highlighted: true,
  },
  {
    icon: Rocket,
    name: "Full Growth Bundle",
    tagline: "Scale with systems, not guesswork",
    price: "$5,997",
    note: "one-time + $297/mo",
    description:
      "The complete growth system. Advanced dashboards, social integration, automation, and dedicated strategy support.",
    features: [
      "Everything in Tier 2",
      "Advanced growth analytics",
      "Social media integration",
      "Automation workflows",
      "Dedicated strategy support",
    ],
    highlighted: false,
  },
];

export function TierPreview() {
  return (
    <Section className="bg-muted/20">
      <SectionHeader
        badge="Three Tiers"
        title="Choose the level of growth your business needs"
        description="Start with a premium foundation. Add trust-building and growth tools when you're ready."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-7 transition-shadow duration-200",
              tier.highlighted
                ? "border-primary/40 shadow-xl shadow-primary/[0.06] ring-1 ring-primary/20"
                : "border-border/60 hover:border-border hover:shadow-lg hover:shadow-black/[0.03]"
            )}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            {tier.highlighted && (
              <Badge className="absolute -top-2.5 left-6 text-[11px] font-semibold tracking-wide">
                Most Popular
              </Badge>
            )}

            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  tier.highlighted ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                <tier.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold">{tier.name}</h3>
                <p className="text-[13px] text-primary font-medium">{tier.tagline}</p>
              </div>
            </div>

            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold tracking-tight">{tier.price}</span>
              <span className="text-sm text-muted-foreground">{tier.note}</span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {tier.description}
            </p>

            <ul className="mt-5 space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[13px]">
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              className="mt-7 gap-1.5"
              variant={tier.highlighted ? "default" : "outline"}
              asChild
            >
              <Link href="/pricing">
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
