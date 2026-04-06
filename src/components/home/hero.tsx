"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroGlobe } from "@/components/home/hero-globe";

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        key: i,
        size: 1 + Math.random() * 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: 5 + Math.random() * 8,
        del: Math.random() * 6,
        drift: 20 + Math.random() * 30,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.key}
          className="absolute rounded-full bg-white"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -p.drift, 0], opacity: [0.05, 0.3, 0.05] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#060613] text-white">
      {/* Gradient orbs — reduced blur on mobile for performance */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[15%] left-[20%] h-[250px] w-[250px] sm:h-[450px] sm:w-[450px] rounded-full bg-[#6c3aed]/[0.12] blur-[60px] sm:blur-[120px]" />
        <div className="absolute top-[25%] right-[15%] h-[200px] w-[200px] sm:h-[350px] sm:w-[350px] rounded-full bg-[#2563eb]/[0.10] blur-[60px] sm:blur-[110px]" />
        <div className="absolute bottom-[15%] left-[45%] h-[180px] w-[180px] sm:h-[300px] sm:w-[300px] rounded-full bg-[#06b6d4]/[0.07] blur-[60px] sm:blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
      </div>

      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] sm:text-[13px] font-medium text-white/60 sm:px-4 sm:py-1.5 sm:gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Now accepting new clients
              </span>
            </motion.div>

            <motion.h1 className="mt-5 text-[1.85rem] font-extrabold leading-[1.1] tracking-tight sm:mt-7 sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 }}>
              The growth system
              <br />
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                your business is missing
              </span>
            </motion.h1>

            {/* Mobile globe */}
            <motion.div
              className="flex justify-center my-4 lg:hidden overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="w-[280px] h-[280px]">
                <HeroGlobe mobile />
              </div>
            </motion.div>

            <motion.p className="max-w-lg text-[14px] leading-[1.7] text-white/50 sm:text-[16px] mx-auto lg:mx-0" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }}>
              Luxury web design, automated lead capture, review systems,
              booking integration, and a dashboard that shows exactly what&apos;s
              driving results. Delivered in days, not months.
            </motion.p>

            <motion.div className="mt-5 flex flex-col items-stretch gap-2.5 sm:mt-7 sm:flex-row sm:items-center lg:justify-start sm:justify-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
              <Button size="lg" className="h-11 sm:h-12 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold text-white hover:opacity-90 border-0 shadow-lg shadow-[#7c3aed]/20 w-full sm:w-auto" asChild>
                <Link href="/pricing">View Plans & Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 sm:h-12 border-white/[0.08] bg-white/[0.03] px-6 sm:px-7 text-[14px] sm:text-[15px] text-white/80 hover:bg-white/[0.06] hover:text-white w-full sm:w-auto" asChild>
                <Link href="/how-it-works"><Play className="mr-2 h-3.5 w-3.5" />How It Works</Link>
              </Button>
            </motion.div>

            <motion.div className="mt-5 flex items-center gap-3 sm:gap-5 text-[11px] sm:text-[13px] text-white/30 justify-center lg:justify-start flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.35 }}>
              {["No contracts", "Delivered in days", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-emerald-400/60" />{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Desktop globe */}
          <motion.div className="hidden lg:flex items-center justify-center overflow-visible" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <div className="relative">
              <HeroGlobe />
              <motion.div className="absolute -top-8 -left-20 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-3 py-2.5 shadow-lg shadow-[#7c3aed]/10 z-20" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <p className="text-[10px] font-medium tracking-wide text-white/40 uppercase">Leads this month</p>
                <p className="mt-0.5 text-lg font-bold">+47</p>
              </motion.div>
              <motion.div className="absolute -bottom-4 right-0 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-3 py-2.5 shadow-lg shadow-emerald-500/10 z-20" animate={{ y: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
                <p className="text-[10px] font-medium tracking-wide text-white/40 uppercase">Conversion</p>
                <p className="mt-0.5 text-lg font-bold text-emerald-400">4.2%</p>
              </motion.div>
              <motion.div className="absolute top-[38%] -right-24 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-3 py-2.5 shadow-lg shadow-yellow-500/10 z-20" animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
                <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((n)=>(<div key={n} className="h-2 w-2 rounded-full bg-yellow-400/70" />))}</div>
                <p className="mt-1 text-[10px] font-medium text-white/40">23 reviews</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div className="relative mx-auto mt-8 sm:mt-14 max-w-5xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-2xl shadow-purple-500/[0.06]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 sm:px-5 sm:py-3">
              <div className="flex gap-1 sm:gap-1.5"><div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" /><div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" /><div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" /></div>
              <div className="ml-2 sm:ml-4 flex-1 rounded-lg bg-white/[0.03] px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs text-white/30">dashboard.convertaflow.com</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-3 hidden border-r border-white/[0.06] bg-white/[0.01] p-3 sm:p-5 lg:block">
                {["Overview", "Leads", "Reviews", "Email", "Social", "Settings"].map((item, i) => (
                  <div key={item} className={`rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-[13px] ${i === 0 ? "bg-gradient-to-r from-[#7c3aed]/15 to-[#3b82f6]/10 font-medium text-white/90" : "text-white/30 mt-0.5"}`}>{item}</div>
                ))}
              </div>
              <div className="col-span-12 p-3 sm:p-6 lg:col-span-9">
                <div className="mb-2 sm:mb-5">
                  <h3 className="text-[13px] sm:text-base font-semibold text-white/90">Welcome back, Sarah</h3>
                  <p className="mt-0.5 text-[10px] sm:text-[13px] text-white/35">Here&apos;s how your business performed this month.</p>
                </div>
                <div className="grid gap-1.5 sm:gap-3 grid-cols-3">
                  {[{ label: "Leads", value: "47", change: "+12%" }, { label: "Reviews", value: "23", change: "+8%" }, { label: "Conv.", value: "4.2%", change: "+0.6%" }].map((s) => (
                    <div key={s.label} className="rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 sm:p-4">
                      <p className="text-[8px] sm:text-[11px] font-medium tracking-wide text-white/35 uppercase">{s.label}</p>
                      <div className="mt-0.5 flex items-baseline gap-1">
                        <span className="text-[15px] sm:text-2xl font-bold text-white/90">{s.value}</span>
                        <span className="text-[8px] sm:text-xs font-medium text-emerald-400">{s.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 sm:mt-5 rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 sm:p-4">
                  <p className="mb-1 sm:mb-3 text-[9px] sm:text-[13px] font-medium text-white/50">Lead Activity</p>
                  <div className="flex items-end gap-[1.5px] sm:gap-[3px] h-8 sm:h-20">
                    {[30, 48, 38, 60, 44, 68, 54, 76, 64, 85, 72, 92].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7c3aed]/25 to-[#3b82f6]/45" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-6 sm:-inset-12 -z-10 rounded-3xl bg-gradient-to-b from-[#7c3aed]/8 via-[#3b82f6]/[0.04] to-transparent blur-2xl sm:blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
