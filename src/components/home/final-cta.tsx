"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  const particles = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        key: i,
        w: 1 + Math.random() * 1.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        drift: 15 + Math.random() * 20,
        dur: 5 + Math.random() * 5,
        del: Math.random() * 4,
      })),
    []
  );

  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#7c3aed]/[0.10] blur-[60px] sm:blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full bg-[#3b82f6]/[0.08] blur-[60px] sm:blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.key}
            className="absolute rounded-full bg-white"
            style={{ width: p.w, height: p.w, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ y: [0, -p.drift, 0], opacity: [0.03, 0.2, 0.03] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <motion.h2 className="motion-fade text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          Ready to look established{" "}
          <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
            and start growing?
          </span>
        </motion.h2>

        <motion.p className="motion-fade mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-white/50 sm:text-[15px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.06 }}>
          Built for cleaning businesses, bakeries, detailers, and local service companies.
          Your website, booking system, and growth tools, delivered in days.
        </motion.p>

        <motion.div className="motion-fade mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.12 }}>
          <Button size="lg" className="h-11 sm:h-12 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold text-white hover:opacity-90 border-0 shadow-lg shadow-[#7c3aed]/20 w-full sm:w-auto" asChild>
            <Link href="/pricing">View Plans & Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="h-11 sm:h-12 border-white/[0.08] bg-white/[0.03] px-6 sm:px-7 text-[14px] sm:text-[15px] text-white/80 hover:bg-white/[0.06] hover:text-white w-full sm:w-auto" asChild>
            <Link href="/contact">Talk to Our Team</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
