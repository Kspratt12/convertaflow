"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroGlobe } from "@/components/home/hero-globe";

/* ─── Starfield — pure CSS, fewer on mobile ─── */
function Starfield() {
  const stars = useMemo(() => {
    const s: { key: number; x: number; y: number; size: number; opacity: number; twinkle: boolean; dur: number; del: number }[] = [];
    for (let i = 0; i < 80; i++) {
      s.push({
        key: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.5,
        twinkle: Math.random() > 0.7,
        dur: 3 + Math.random() * 5,
        del: Math.random() * 4,
      });
    }
    return s;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.key}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Dashboard mockup with animated bars + count-up stats ─── */
function DashCountUp({ end, suffix = "", decimal = false }: { end: number; suffix?: string; decimal?: boolean }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const target = decimal ? end * 10 : end;
        function tick(now: number) {
          const p = Math.min((now - t0) / 1500, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, decimal]);

  const display = decimal ? (val / 10).toFixed(1) : val;
  return <span ref={ref}>{display}{suffix}</span>;
}

function DashboardMockup() {
  const barHeights = [30, 48, 38, 60, 44, 68, 54, 76, 64, 85, 72, 92];

  return (
    <div className="relative mx-auto mt-8 sm:mt-14 max-w-5xl">
      <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-2xl shadow-purple-500/[0.06]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 sm:px-5 sm:py-3">
          <div className="flex gap-1 sm:gap-1.5"><div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" /><div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" /><div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" /></div>
          <div className="ml-2 sm:ml-4 flex-1 rounded-lg bg-white/[0.03] px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs text-white/30">dashboard.convertaflow.co</div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-3 hidden border-r border-white/[0.06] bg-white/[0.01] p-3 sm:p-5 lg:block">
            {["Overview", "Leads", "Reviews", "Email", "Social", "Settings"].map((item, i) => (
              <div key={item} className={`rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-[13px] ${i === 0 ? "bg-gradient-to-r from-[#7c3aed]/15 to-[#3b82f6]/10 font-medium text-white/90" : "text-white/30 mt-0.5"}`}>{item}</div>
            ))}
          </div>
          <div className="col-span-12 p-3 sm:p-6 lg:col-span-9">
            <div className="mb-2 sm:mb-5">
              <h3 className="text-[13px] sm:text-base font-semibold text-white/90">Welcome back</h3>
              <p className="mt-0.5 text-[10px] sm:text-[13px] text-white/35">Here&apos;s how your business is doing this month.</p>
            </div>
            <div className="grid gap-1.5 sm:gap-3 grid-cols-3">
              <div className="rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 sm:p-4">
                <p className="text-[8px] sm:text-[11px] font-medium tracking-wide text-white/35 uppercase">New customers</p>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-[15px] sm:text-2xl font-bold text-white/90"><DashCountUp end={47} /></span>
                  <span className="text-[8px] sm:text-xs font-medium text-emerald-400">this month</span>
                </div>
              </div>
              <div className="rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 sm:p-4">
                <p className="text-[8px] sm:text-[11px] font-medium tracking-wide text-white/35 uppercase">5-star reviews</p>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-[15px] sm:text-2xl font-bold text-white/90"><DashCountUp end={23} /></span>
                  <span className="text-[8px] sm:text-xs font-medium text-emerald-400">+6 new</span>
                </div>
              </div>
              <div className="rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 sm:p-4">
                <p className="text-[8px] sm:text-[11px] font-medium tracking-wide text-white/35 uppercase">New revenue</p>
                <div className="mt-0.5 flex items-baseline gap-1">
                  <span className="text-[15px] sm:text-2xl font-bold text-white/90">$<DashCountUp end={18} />k</span>
                  <span className="text-[8px] sm:text-xs font-medium text-emerald-400">from your site</span>
                </div>
              </div>
            </div>
            <div className="mt-1.5 sm:mt-5 rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 sm:p-4">
              <p className="mb-1 sm:mb-3 text-[9px] sm:text-[13px] font-medium text-white/50">New customers this month</p>
              <div className="flex items-end gap-[1.5px] sm:gap-[3px] h-8 sm:h-20">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7c3aed]/25 to-[#3b82f6]/45"
                    style={{
                      height: `${h}%`,
                      animation: `bar-rise 1s ${0.1 + i * 0.06}s ease-out both`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-6 sm:-inset-12 -z-10 rounded-3xl bg-gradient-to-b from-[#7c3aed]/8 via-[#3b82f6]/[0.04] to-transparent hidden sm:block blur-3xl" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#060613] text-white">
      {/* Desktop nebula glow */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-[#6c3aed]/[0.08] blur-[140px]" />
        <div className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-[#2563eb]/[0.06] blur-[130px]" />
        <div className="absolute bottom-[10%] left-[40%] h-[350px] w-[350px] rounded-full bg-[#06b6d4]/[0.05] blur-[130px]" />
      </div>
      {/* Mobile: simple gradient, zero blur */}
      <div className="pointer-events-none absolute inset-0 sm:hidden bg-gradient-to-b from-[#6c3aed]/[0.06] via-transparent to-[#06b6d4]/[0.04]" />

      <Starfield />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="text-center lg:text-left">
            {/* Badge — no animation on mobile */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] sm:text-[13px] font-medium text-white/60 sm:px-4 sm:py-1.5 sm:gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Now accepting new clients
              </span>
            </div>

            <h1 className="mt-5 text-[1.85rem] font-extrabold leading-[1.1] tracking-tight sm:mt-7 sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]">
              A website that actually
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)",
                  backgroundSize: "200% 100%",
                  animation: "text-wave 6s ease-in-out infinite",
                }}
              >
                brings you customers
              </span>
            </h1>

            {/* Mobile globe — no motion wrapper */}
            <div className="flex justify-center my-4 lg:hidden overflow-hidden relative z-0">
              <div className="w-[280px] h-[280px]">
                <HeroGlobe mobile />
              </div>
            </div>

            <p className="max-w-lg text-[14px] leading-[1.7] text-white/50 sm:text-[16px] mx-auto lg:mx-0">
              We build your website, set up everything that catches new
              customers for you, and handle the boring stuff after. So you
              can focus on the work you actually love. Delivered in days,
              not months.
            </p>

            <div className="mt-5 flex flex-col items-stretch gap-2.5 sm:mt-7 sm:flex-row sm:items-center lg:justify-start sm:justify-center">
              <Button size="lg" className="h-11 sm:h-12 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold text-white hover:opacity-90 border-0 shadow-lg shadow-[#7c3aed]/20 w-full sm:w-auto" asChild>
                <Link href="/pricing">View Plans & Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 sm:h-12 border-white/[0.08] bg-white/[0.03] px-6 sm:px-7 text-[14px] sm:text-[15px] text-white/80 hover:bg-white/[0.06] hover:text-white w-full sm:w-auto" asChild>
                <Link href="/how-it-works"><Play className="mr-2 h-3.5 w-3.5" />How It Works</Link>
              </Button>
            </div>

            <div className="mt-5 flex items-center gap-3 sm:gap-5 text-[11px] sm:text-[13px] text-white/30 justify-center lg:justify-start flex-wrap">
              {["No contracts", "Delivered in days", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-emerald-400/60" />{t}</span>
              ))}
            </div>
          </div>

          {/* Desktop globe — framer-motion only here */}
          <motion.div className="hidden lg:flex items-center justify-center overflow-visible" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <div className="relative">
              <HeroGlobe />
              <motion.div
                className="absolute -top-8 -left-20 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-3 py-2.5 shadow-lg shadow-[#7c3aed]/10 z-20 will-change-transform"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              >
                <p className="text-[10px] font-medium tracking-wide text-white/40 uppercase">New customers</p>
                <p className="mt-0.5 text-lg font-bold">47 this month</p>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 right-0 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-3 py-2.5 shadow-lg shadow-emerald-500/10 z-20 will-change-transform"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.6 }}
              >
                <p className="text-[10px] font-medium tracking-wide text-white/40 uppercase">New revenue</p>
                <p className="mt-0.5 text-lg font-bold text-emerald-400">+$18k</p>
              </motion.div>
              <motion.div
                className="absolute top-[38%] -right-24 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-3 py-2.5 shadow-lg shadow-yellow-500/10 z-20 will-change-transform"
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 6.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.2 }}
              >
                <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((n)=>(<div key={n} className="h-2 w-2 rounded-full bg-yellow-400/70" />))}</div>
                <p className="mt-1 text-[10px] font-medium text-white/40">23 happy customers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard mockup — animated */}
        <DashboardMockup />
      </div>
    </section>
  );
}
