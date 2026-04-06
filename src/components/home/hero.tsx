"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => {
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

/* Social platform icons as SVG paths */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="url(#ig-grad)">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75"/>
          <stop offset="25%" stopColor="#fa7e1e"/>
          <stop offset="50%" stopColor="#d62976"/>
          <stop offset="75%" stopColor="#962fbf"/>
          <stop offset="100%" stopColor="#4f5bd5"/>
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.13a8.16 8.16 0 005.58 2.2V11.3a4.85 4.85 0 01-3.77-1.84V6.69h3.77z"/>
    </svg>
  );
}

const socialIcons = [
  { Icon: GoogleIcon, label: "Google", color: "#4285F4", top: "5%", left: "78%", delay: 0 },
  { Icon: FacebookIcon, label: "Facebook", color: "#1877F2", top: "35%", left: "95%", delay: 1 },
  { Icon: InstagramIcon, label: "Instagram", color: "#E4405F", top: "75%", left: "85%", delay: 2 },
  { Icon: TikTokIcon, label: "TikTok", color: "#ffffff", top: "88%", left: "55%", delay: 3 },
];

function GlowingGlobe() {
  return (
    <div className="relative flex items-center justify-center w-[340px] h-[340px] sm:w-[380px] sm:h-[380px]">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7c3aed]/30 via-[#3b82f6]/20 to-[#06b6d4]/30 blur-[60px] animate-pulse" />

      {/* Globe body */}
      <motion.div
        className="relative w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c3aed]/60 via-[#3b82f6]/40 to-[#06b6d4]/50 shadow-2xl shadow-[#7c3aed]/30" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/[0.05] to-white/[0.12]" />

        {/* Grid lines */}
        {[25, 40, 55, 70].map((top) => (
          <div key={`lat-${top}`} className="absolute left-[10%] right-[10%] border-t border-white/[0.08] rounded-full" style={{ top: `${top}%`, transform: `scaleX(${1 - Math.abs(top - 50) / 60})` }} />
        ))}
        {[0, 45, 90, 135].map((deg) => (
          <div key={`lon-${deg}`} className="absolute inset-[8%] border border-white/[0.06] rounded-full" style={{ transform: `rotateY(${deg}deg) scaleX(0.4)` }} />
        ))}

        <div className="absolute top-[15%] left-[20%] w-[35%] h-[25%] rounded-full bg-white/[0.08] blur-xl" />

        {/* Data points */}
        {[
          { top: "28%", left: "30%", delay: 0 },
          { top: "45%", left: "65%", delay: 1.5 },
          { top: "62%", left: "40%", delay: 3 },
          { top: "35%", left: "55%", delay: 0.8 },
          { top: "55%", left: "25%", delay: 2.2 },
        ].map((dot, i) => (
          <motion.div key={i} className="absolute" style={{ top: dot.top, left: dot.left }} animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}>
            <div className="h-2 w-2 rounded-full bg-[#06b6d4] shadow-lg shadow-[#06b6d4]/50" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-[#06b6d4]/40 blur-sm" />
          </motion.div>
        ))}
      </motion.div>

      {/* Orbital rings */}
      <div className="absolute inset-[-10px] sm:inset-[-15px] rounded-full border border-[#7c3aed]/15" style={{ transform: "rotateX(70deg) rotateZ(-20deg)" }} />
      <div className="absolute inset-[-30px] sm:inset-[-40px] rounded-full border border-[#06b6d4]/10" style={{ transform: "rotateX(75deg) rotateZ(40deg)" }} />
      <div className="absolute inset-[-50px] sm:inset-[-60px] rounded-full border border-white/[0.04]" style={{ transform: "rotateX(80deg) rotateZ(-10deg)" }} />

      {/* Floating social platform icons */}
      {socialIcons.map(({ Icon, label, color, top, left, delay }) => (
        <motion.div
          key={label}
          className="absolute"
          style={{ top, left }}
          animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.1] bg-[#0e0e2a]/90 backdrop-blur-xl shadow-lg" style={{ boxShadow: `0 4px 20px ${color}20` }}>
            <Icon />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#060613] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[15%] left-[20%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#6c3aed]/[0.14] blur-[100px] sm:blur-[140px]" />
        <div className="absolute top-[25%] right-[15%] h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#2563eb]/[0.12] blur-[100px] sm:blur-[130px]" />
        <div className="absolute bottom-[15%] left-[45%] h-[200px] w-[200px] sm:h-[350px] sm:w-[350px] rounded-full bg-[#06b6d4]/[0.08] blur-[100px] sm:blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
      </div>

      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] sm:text-[13px] font-medium text-white/60 backdrop-blur-sm sm:px-4 sm:py-1.5 sm:gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Now accepting new clients
              </span>
            </motion.div>

            <motion.h1 className="mt-6 text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:mt-8 sm:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}>
              The growth system
              <br />
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                your business is missing
              </span>
            </motion.h1>

            <motion.p className="mt-4 max-w-lg text-[15px] leading-[1.7] text-white/50 sm:mt-5 sm:text-[17px] mx-auto lg:mx-0" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16 }}>
              Premium website, automated lead capture, review collection,
              email follow-up, and a dashboard that shows exactly what&apos;s
              driving results. One platform. Everything connected.
            </motion.p>

            <motion.div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center lg:justify-start sm:justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.24 }}>
              <Button size="lg" className="h-11 sm:h-12 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-6 sm:px-7 text-[14px] sm:text-[15px] font-semibold text-white hover:opacity-90 border-0 shadow-lg shadow-[#7c3aed]/20 w-full sm:w-auto" asChild>
                <Link href="/pricing">View Plans & Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 sm:h-12 border-white/[0.08] bg-white/[0.03] px-6 sm:px-7 text-[14px] sm:text-[15px] text-white/80 hover:bg-white/[0.06] hover:text-white w-full sm:w-auto" asChild>
                <Link href="/how-it-works"><Play className="mr-2 h-3.5 w-3.5" />How It Works</Link>
              </Button>
            </motion.div>

            <motion.div className="mt-8 flex items-center gap-4 sm:gap-6 text-[11px] sm:text-[13px] text-white/30 justify-center lg:justify-start flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
              {["No contracts", "Launch in 2 weeks", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-emerald-400/60" />{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Globe visual */}
          <motion.div className="hidden lg:flex items-center justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative">
              <GlowingGlobe />

              <motion.div className="absolute -top-10 -left-32 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-4 py-3 backdrop-blur-xl shadow-lg shadow-[#7c3aed]/10" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <p className="text-[11px] font-medium tracking-wide text-white/40 uppercase">Leads this month</p>
                <p className="mt-0.5 text-xl font-bold">+47</p>
              </motion.div>

              <motion.div className="absolute -bottom-8 -right-28 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-4 py-3 backdrop-blur-xl shadow-lg shadow-emerald-500/10" animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
                <p className="text-[11px] font-medium tracking-wide text-white/40 uppercase">Conversion</p>
                <p className="mt-0.5 text-xl font-bold text-emerald-400">4.2%</p>
              </motion.div>

              <motion.div className="absolute top-1/2 -right-36 -translate-y-1/2 rounded-xl border border-white/[0.06] bg-[#0e0e2a]/90 px-4 py-3 backdrop-blur-xl shadow-lg shadow-yellow-500/10" animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
                <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((n)=>(<div key={n} className="h-2 w-2 rounded-full bg-yellow-400/70" />))}</div>
                <p className="mt-1 text-[11px] font-medium text-white/40">23 reviews</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard mockup */}
        <motion.div className="relative mx-auto mt-12 sm:mt-20 max-w-5xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}>
          <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-2xl shadow-purple-500/[0.06] backdrop-blur-sm">
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
              <div className="col-span-12 p-4 sm:p-6 lg:col-span-9">
                <div className="mb-4 sm:mb-5">
                  <h3 className="text-sm sm:text-base font-semibold text-white/90">Welcome back, Sarah</h3>
                  <p className="mt-0.5 text-[11px] sm:text-[13px] text-white/35">Here&apos;s how your business performed this month.</p>
                </div>
                <div className="grid gap-2 sm:gap-3 grid-cols-3">
                  {[{ label: "New Leads", value: "47", change: "+12%" }, { label: "Reviews", value: "23", change: "+8%" }, { label: "Conversion", value: "4.2%", change: "+0.6%" }].map((s) => (
                    <div key={s.label} className="rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 sm:p-4">
                      <p className="text-[9px] sm:text-[11px] font-medium tracking-wide text-white/35 uppercase">{s.label}</p>
                      <div className="mt-1 flex items-baseline gap-1 sm:gap-2">
                        <span className="text-lg sm:text-2xl font-bold text-white/90">{s.value}</span>
                        <span className="text-[9px] sm:text-xs font-medium text-emerald-400">{s.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 sm:mt-5 rounded-lg sm:rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4">
                  <p className="mb-2 sm:mb-3 text-[11px] sm:text-[13px] font-medium text-white/50">Lead Activity</p>
                  <div className="flex items-end gap-[2px] sm:gap-[3px] h-14 sm:h-20">
                    {[30, 48, 38, 60, 44, 68, 54, 76, 64, 85, 72, 92].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7c3aed]/25 to-[#3b82f6]/45" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-8 sm:-inset-12 -z-10 rounded-3xl bg-gradient-to-b from-[#7c3aed]/10 via-[#3b82f6]/[0.06] to-transparent blur-3xl" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-transparent to-[#060613]" />
    </section>
  );
}
