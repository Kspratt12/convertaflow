"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Star, Rocket, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[10%] h-[450px] w-[450px] rounded-full bg-[#7c3aed]/[0.07] blur-[140px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[400px] w-[400px] rounded-full bg-[#3b82f6]/[0.06] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            Three Tiers
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Choose the level of growth{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              your business needs
            </span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-white/45">
            Start with a premium foundation. Add trust-building and growth tools when you&apos;re ready.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 transition-all duration-200",
                tier.highlighted
                  ? "border-[#7c3aed]/40 bg-white/[0.06] shadow-xl shadow-purple-500/[0.08] ring-1 ring-[#7c3aed]/20 lg:scale-[1.02]"
                  : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.05]"
              )}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              {tier.highlighted && (
                <Badge className="absolute -top-2.5 left-6 text-[11px] font-semibold tracking-wide bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0">
                  Most Popular
                </Badge>
              )}

              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    tier.highlighted
                      ? "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] text-white"
                      : "bg-white/[0.06] text-white/60"
                  )}
                >
                  <tier.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{tier.name}</h3>
                  <p className="text-[13px] text-[#8b5cf6] font-medium">{tier.tagline}</p>
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-white">{tier.price}</span>
                <span className="text-sm text-white/35">{tier.note}</span>
              </div>

              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/40">
                {tier.description}
              </p>

              <ul className="mt-5 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] text-white/70">
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "mt-6 gap-1.5",
                  tier.highlighted
                    ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90"
                    : "bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]"
                )}
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
      </div>
    </section>
  );
}
