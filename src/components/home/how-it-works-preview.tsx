"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "01",
    icon: Rocket,
    title: "Launch",
    subtitle: "Your luxury website, live in days",
    description:
      "We design and build a custom website for your brand in 5–14 business days. Lead capture, booking, and SEO baked in from the start.",
    color: "from-[#7c3aed] to-[#6c3aed]",
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Track",
    subtitle: "Systems that work while you sleep",
    description:
      "Automated review requests, instant lead notifications, and a dashboard showing exactly who's reaching out and what's converting.",
    color: "from-[#3b82f6] to-[#2563eb]",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Scale",
    subtitle: "Data-driven decisions, real growth",
    description:
      "Advanced analytics, social automation, and ManyChat workflows turn your online presence into a growth engine with clear ROI.",
    color: "from-[#06b6d4] to-[#0891b2]",
  },
];

export function HowItWorksPreview() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            Process
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Launch. Track. Scale. <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">Repeat.</span>
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="motion-fade group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "20px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[36px] sm:text-[40px] font-extrabold leading-none bg-gradient-to-b from-white/70 to-white/30 bg-clip-text text-transparent">
                  {step.step}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                  <step.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-3 text-base sm:text-lg font-bold text-white/90">{step.title}</h3>
              <p className="mt-0.5 text-[13px] font-medium text-[#8b5cf6]">{step.subtitle}</p>
              <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-white/40">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Button variant="outline" className="gap-1.5 border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-white" asChild>
            <Link href="/how-it-works">
              See the Full Process
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
