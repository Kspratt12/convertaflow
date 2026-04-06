"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function RotatingCube() {
  return (
    <div className="relative h-[120px] w-[120px]" style={{ perspective: "600px" }}>
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: 360, rotateX: 15 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border border-white/20 bg-gradient-to-br from-[#6c3aed]/40 to-[#3b82f6]/30 backdrop-blur-sm"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-1.5 p-3">
            <div className="h-2 w-10 rounded bg-white/30" />
            <div className="h-2 w-7 rounded bg-[#06b6d4]/50" />
            <div className="mt-1 h-6 w-12 rounded bg-white/10" />
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-[#3b82f6]/30 to-[#06b6d4]/20 backdrop-blur-sm"
          style={{ transform: "rotateY(180deg) translateZ(60px)" }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-1.5 p-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
              ))}
            </div>
            <div className="h-2 w-8 rounded bg-white/20" />
          </div>
        </div>
        {/* Right */}
        <div
          className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-[#6c3aed]/30 to-[#8b5cf6]/20 backdrop-blur-sm"
          style={{ transform: "rotateY(90deg) translateZ(60px)" }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
            <div className="flex items-end gap-0.5 h-8">
              {[40, 60, 45, 80, 55].map((h, j) => (
                <div key={j} className="w-2 rounded-t bg-[#06b6d4]/40" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
        {/* Left */}
        <div
          className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-[#06b6d4]/20 to-[#3b82f6]/30 backdrop-blur-sm"
          style={{ transform: "rotateY(-90deg) translateZ(60px)" }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-1.5 p-3">
            <div className="h-2 w-2 rounded-full bg-emerald-400/60" />
            <div className="h-1.5 w-8 rounded bg-white/20" />
            <div className="h-1.5 w-6 rounded bg-white/10" />
          </div>
        </div>
        {/* Top */}
        <div
          className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-br from-[#8b5cf6]/20 to-[#6c3aed]/10"
          style={{ transform: "rotateX(90deg) translateZ(60px)" }}
        />
        {/* Bottom */}
        <div
          className="absolute inset-0 rounded-xl border border-white/5 bg-[#0a0a1a]/50"
          style={{ transform: "rotateX(-90deg) translateZ(60px)" }}
        />
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a1a] text-white">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#6c3aed]/20 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-[#2563eb]/20 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/2 h-[350px] w-[350px] rounded-full bg-[#06b6d4]/15 blur-[120px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-5">
          {/* Content - left side */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Now accepting new business clients
              </span>
            </motion.div>

            <motion.h1
              className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stop losing leads
              <br />
              <span className="bg-gradient-to-r from-[#6c3aed] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                to an outdated website
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Convertaflow gives your business a premium online presence,
              automated lead capture, review collection, and a simple dashboard to
              see what&apos;s working — all in one system.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                <Link href="/how-it-works">
                  <Play className="mr-2 h-4 w-4" />
                  See How It Works
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Visual - right side: rotating cube + floating elements */}
          <motion.div
            className="lg:col-span-2 hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <RotatingCube />
              {/* Glow behind cube */}
              <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-gradient-to-r from-[#6c3aed]/30 via-[#3b82f6]/20 to-[#06b6d4]/30 blur-3xl" />

              {/* Floating stat cards */}
              <motion.div
                className="absolute -top-12 -left-28 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs text-white/50">New Leads</p>
                <p className="text-lg font-bold">+47</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -right-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <p className="text-xs text-white/50">Conversion</p>
                <p className="text-lg font-bold text-emerald-400">4.2%</p>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-32 -translate-y-1/2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className="h-2 w-2 rounded-full bg-yellow-400/80"
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-white/50">23 reviews</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview - below */}
        <motion.div
          className="relative mx-auto mt-20 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl shadow-purple-500/10 backdrop-blur-sm">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
                dashboard.convertaflow.com
              </div>
            </div>

            <div className="grid grid-cols-12 gap-0">
              {/* Sidebar */}
              <div className="col-span-3 hidden border-r border-white/10 bg-white/[0.02] p-4 lg:block">
                <div className="space-y-1">
                  {["Overview", "Leads", "Reviews", "Email", "Social", "Settings"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-sm ${
                          i === 0
                            ? "bg-gradient-to-r from-[#6c3aed]/20 to-[#3b82f6]/10 font-medium text-white"
                            : "text-white/40"
                        }`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Main content */}
              <div className="col-span-12 p-6 lg:col-span-9">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    Welcome back, Sarah
                  </h3>
                  <p className="text-sm text-white/40">
                    Your business is performing well this month.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "New Leads", value: "47", change: "+12%" },
                    { label: "Reviews Collected", value: "23", change: "+8%" },
                    { label: "Conversion Rate", value: "4.2%", change: "+0.6%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-xs font-medium text-white/40">
                        {stat.label}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">
                          {stat.value}
                        </span>
                        <span className="text-xs font-medium text-emerald-400">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-sm font-medium text-white/60">
                    Lead Activity
                  </p>
                  <div className="flex items-end gap-1.5 h-24">
                    {[35, 52, 40, 65, 48, 72, 58, 80, 68, 90, 75, 95].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-[#6c3aed]/30 to-[#3b82f6]/50"
                          style={{ height: `${h}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-3xl bg-gradient-to-b from-[#6c3aed]/15 via-[#3b82f6]/10 to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
