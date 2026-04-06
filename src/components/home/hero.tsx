"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => {
        const size = 1 + Math.random() * 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = 5 + Math.random() * 8;
        const del = Math.random() * 6;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
            animate={{ y: [0, -(20 + Math.random() * 30), 0], opacity: [0.05, 0.35, 0.05] }}
            transition={{ duration: dur, repeat: Infinity, delay: del, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

function RotatingCube() {
  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32" style={{ perspective: "600px" }}>
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: 360, rotateX: 12 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {[
          { rot: "translateZ(64px)", grad: "from-[#6c3aed]/40 to-[#3b82f6]/30" },
          { rot: "rotateY(180deg) translateZ(64px)", grad: "from-[#3b82f6]/30 to-[#06b6d4]/20" },
          { rot: "rotateY(90deg) translateZ(64px)", grad: "from-[#6c3aed]/30 to-[#8b5cf6]/20" },
          { rot: "rotateY(-90deg) translateZ(64px)", grad: "from-[#06b6d4]/20 to-[#3b82f6]/30" },
        ].map((face, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-xl border border-white/[0.08] bg-gradient-to-br ${face.grad} backdrop-blur-sm`}
            style={{ transform: face.rot }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-1.5 p-4 opacity-60">
              {i === 0 && (
                <>
                  <div className="h-1.5 w-10 rounded-full bg-white/30" />
                  <div className="h-1.5 w-7 rounded-full bg-[#06b6d4]/40" />
                  <div className="mt-1 h-5 w-11 rounded bg-white/10" />
                </>
              )}
              {i === 1 && (
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
                  ))}
                </div>
              )}
              {i === 2 && (
                <div className="flex items-end gap-0.5 h-8">
                  {[40, 65, 45, 80, 55].map((h, j) => (
                    <div key={j} className="w-1.5 rounded-t bg-[#06b6d4]/40" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
              {i === 3 && <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/50" />}
            </div>
          </div>
        ))}
        <div className="absolute inset-0 rounded-xl border border-white/5 bg-[#8b5cf6]/10" style={{ transform: "rotateX(90deg) translateZ(64px)" }} />
        <div className="absolute inset-0 rounded-xl bg-[#0a0a1a]/40" style={{ transform: "rotateX(-90deg) translateZ(64px)" }} />
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#060613] text-white">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[15%] left-[20%] h-[500px] w-[500px] rounded-full bg-[#6c3aed]/[0.14] blur-[140px]" />
        <div className="absolute top-[25%] right-[15%] h-[400px] w-[400px] rounded-full bg-[#2563eb]/[0.12] blur-[130px]" />
        <div className="absolute bottom-[15%] left-[45%] h-[350px] w-[350px] rounded-full bg-[#06b6d4]/[0.08] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[13px] font-medium text-white/60 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Now accepting new clients
              </span>
            </motion.div>

            <motion.h1
              className="mt-8 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              Your business deserves
              <br />
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                more than a basic website
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-lg text-[17px] leading-[1.7] text-white/50 sm:text-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              Convertaflow is the premium website and growth system that helps
              you look established, capture every lead, collect reviews, and see
              exactly what&apos;s driving results.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24 }}
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
                <Link href="/how-it-works">
                  <Play className="mr-2 h-3.5 w-3.5" />
                  How It Works
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-6 text-[13px] text-white/30 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                No contracts
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                Launch in 2 weeks
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-400/60" />
                Cancel anytime
              </span>
            </motion.div>
          </div>

          {/* Visual — rotating cube + floating cards */}
          <motion.div
            className="lg:col-span-2 hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <div className="relative">
              <RotatingCube />
              <div className="absolute inset-0 -z-10 scale-[2] rounded-full bg-gradient-to-r from-[#7c3aed]/20 via-[#3b82f6]/15 to-[#06b6d4]/20 blur-[60px]" />

              <motion.div
                className="absolute -top-14 -left-32 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[11px] font-medium tracking-wide text-white/40 uppercase">Leads this month</p>
                <p className="mt-0.5 text-xl font-bold">+47</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-10 -right-28 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur-lg"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <p className="text-[11px] font-medium tracking-wide text-white/40 uppercase">Conversion</p>
                <p className="mt-0.5 text-xl font-bold text-emerald-400">4.2%</p>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-36 -translate-y-1/2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  ))}
                </div>
                <p className="mt-1 text-[11px] font-medium text-white/40">23 reviews</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          className="relative mx-auto mt-24 max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-2xl shadow-purple-500/[0.06] backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="ml-4 flex-1 rounded-lg bg-white/[0.03] px-3 py-1 text-xs text-white/30">
                dashboard.convertaflow.com
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="col-span-3 hidden border-r border-white/[0.06] bg-white/[0.01] p-5 lg:block">
                {["Overview", "Leads", "Reviews", "Email", "Social", "Settings"].map((item, i) => (
                  <div
                    key={item}
                    className={`rounded-lg px-3 py-2 text-[13px] ${
                      i === 0
                        ? "bg-gradient-to-r from-[#7c3aed]/15 to-[#3b82f6]/10 font-medium text-white/90"
                        : "text-white/30 mt-0.5"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="col-span-12 p-6 lg:col-span-9">
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-white/90">Welcome back, Sarah</h3>
                  <p className="mt-0.5 text-[13px] text-white/35">Here&apos;s how your business performed this month.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "New Leads", value: "47", change: "+12%", color: "text-emerald-400" },
                    { label: "Reviews", value: "23", change: "+8%", color: "text-emerald-400" },
                    { label: "Conversion", value: "4.2%", change: "+0.6%", color: "text-emerald-400" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <p className="text-[11px] font-medium tracking-wide text-white/35 uppercase">{s.label}</p>
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white/90">{s.value}</span>
                        <span className={`text-xs font-medium ${s.color}`}>{s.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="mb-3 text-[13px] font-medium text-white/50">Lead Activity</p>
                  <div className="flex items-end gap-[3px] h-20">
                    {[30, 48, 38, 60, 44, 68, 54, 76, 64, 85, 72, 92].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7c3aed]/25 to-[#3b82f6]/45"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-12 -z-10 rounded-3xl bg-gradient-to-b from-[#7c3aed]/10 via-[#3b82f6]/[0.06] to-transparent blur-3xl" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
