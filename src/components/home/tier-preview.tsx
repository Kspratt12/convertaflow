"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Star, Rocket, Check, ArrowRight, Clock, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const tierIcons = { starter: Globe, growth: Star, scale: Rocket };

export function TierPreview() {
  const tiers = Object.values(TIERS);

  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[10%] left-[10%] h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-[#7c3aed]/[0.06] blur-[60px] sm:blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#3b82f6]/[0.05] blur-[60px] sm:blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <span className="mb-4 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 sm:mb-5">
            Three Tiers
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Choose the level of growth{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              your business needs
            </span>
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {tiers.map((tier, i) => {
            const Icon = tierIcons[tier.id];
            return (
              <motion.div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-5 sm:p-6 transition-all duration-200",
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
                  <Badge className="absolute -top-2.5 left-5 text-[11px] font-semibold tracking-wide bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0">
                    Most Popular
                  </Badge>
                )}

                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    tier.highlighted ? "bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] text-white" : "bg-white/[0.06] text-white/60"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-[15px]">{tier.name}</h3>
                    <p className="text-[12px] text-[#8b5cf6] font-medium">{tier.audience}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{tier.price}</span>
                  <span className="text-[12px] sm:text-sm text-white/35">{tier.priceNote}</span>
                </div>

                {/* Delivery + Revisions */}
                <div className="mt-3 flex gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/50">
                    <Clock className="h-3 w-3 text-[#06b6d4]" />
                    {tier.deliveryDays}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/50">
                    <RotateCcw className="h-3 w-3 text-[#06b6d4]" />
                    {tier.revisions} revisions
                  </div>
                </div>

                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/40">
                  {tier.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {tier.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[12px] sm:text-[13px] text-white/70">
                      <Check className="h-3 w-3 shrink-0 text-[#06b6d4]" />
                      {f}
                    </li>
                  ))}
                  {tier.features.length > 5 && (
                    <li className="text-[12px] text-white/30">+{tier.features.length - 5} more</li>
                  )}
                </ul>

                <Button
                  className={cn(
                    "mt-5 gap-1.5",
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
