"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a1a] py-24 text-white sm:py-32">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#6c3aed]/15 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#3b82f6]/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-[#06b6d4]/10 blur-[100px]" />
      </div>

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.05,
            }}
            animate={{
              y: [0, -20 - Math.random() * 30, 0],
              opacity: [0.05, 0.3, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to stop losing leads{" "}
          <span className="bg-gradient-to-r from-[#6c3aed] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
            and start growing?
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join the businesses that chose to look premium, capture every
          opportunity, and build the trust that drives real growth.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            size="lg"
            className="h-12 bg-gradient-to-r from-[#6c3aed] to-[#3b82f6] px-8 text-base font-semibold text-white hover:opacity-90 border-0 shadow-lg shadow-[#6c3aed]/25"
            asChild
          >
            <Link href="/pricing">
              See Plans & Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/15 bg-white/5 px-8 text-base text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/contact">Talk to Our Team</Link>
          </Button>
        </motion.div>

        <p className="mt-6 text-xs text-white/40">
          No commitment required. See if Convertaflow is right for your business.
        </p>
      </div>
    </section>
  );
}
