"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-28 text-white sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.12] blur-[120px]" />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#3b82f6]/[0.10] blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 1.5,
              height: 1 + Math.random() * 1.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -(15 + Math.random() * 20), 0], opacity: [0.03, 0.25, 0.03] }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <motion.h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Ready to stop guessing{" "}
          <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
            and start growing?
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-white/50"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          Join the businesses that chose to look premium, capture every lead,
          and build the trust that drives real growth.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <Button
            size="lg"
            className="h-12 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-7 text-[15px] font-semibold text-white hover:opacity-90 border-0 shadow-lg shadow-[#7c3aed]/20"
            asChild
          >
            <Link href="/pricing">
              View Plans & Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/[0.08] bg-white/[0.03] px-7 text-[15px] text-white/80 hover:bg-white/[0.06] hover:text-white"
            asChild
          >
            <Link href="/contact">Talk to Our Team</Link>
          </Button>
        </motion.div>

        <p className="mt-8 text-[13px] text-white/30">
          No contracts. No commitment. See if Convertaflow is right for you.
        </p>
      </div>
    </section>
  );
}
