"use client";

import { motion } from "framer-motion";

/* Social platform icons */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
function FacebookIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}
function InstagramIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function TikTokIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.13a8.16 8.16 0 005.58 2.2V11.3a4.85 4.85 0 01-3.77-1.84V6.69h3.77z"/></svg>;
}

const socialIcons = [
  { Icon: GoogleIcon, label: "Google", color: "#4285F4", top: "2%", left: "75%", delay: 0 },
  { Icon: FacebookIcon, label: "Facebook", color: "#1877F2", top: "30%", left: "96%", delay: 1 },
  { Icon: InstagramIcon, label: "Instagram", color: "#E4405F", top: "72%", left: "88%", delay: 2 },
  { Icon: TikTokIcon, label: "TikTok", color: "#ffffff", top: "90%", left: "55%", delay: 3 },
];

/* Generate dot grid for continent-like patterns */
function GlobeDots() {
  const dots: { cx: number; cy: number; r: number; opacity: number }[] = [];
  // Create a sphere-mapped dot grid
  for (let lat = -80; lat <= 80; lat += 8) {
    const latRad = (lat * Math.PI) / 180;
    const y = 50 + Math.sin(latRad) * 45;
    const rowWidth = Math.cos(latRad);
    const dotsInRow = Math.floor(rowWidth * 20);
    for (let j = 0; j < dotsInRow; j++) {
      const lonFraction = j / dotsInRow;
      const x = 50 + (lonFraction - 0.5) * rowWidth * 90;
      // Simulate continents — only show some dots based on position
      const noise = Math.sin(lat * 0.3 + j * 1.7) * Math.cos(lat * 0.5 - j * 0.9);
      if (noise > -0.2) {
        dots.push({
          cx: x,
          cy: y,
          r: 0.6 + Math.random() * 0.3,
          opacity: 0.15 + noise * 0.25 + Math.random() * 0.15,
        });
      }
    }
  }
  return dots;
}

const globeDots = GlobeDots();

export function HeroGlobe() {
  return (
    <div className="relative flex items-center justify-center w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]">
      {/* Deep outer glow */}
      <div className="absolute inset-[-20%] rounded-full bg-[#7c3aed]/20 blur-[80px]" />
      <div className="absolute inset-[-10%] rounded-full bg-[#3b82f6]/15 blur-[60px] animate-pulse" />

      {/* Globe sphere */}
      <motion.div
        className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full overflow-hidden"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        {/* Base sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a0a4e] via-[#0f1b5e] to-[#0a2a6e]" />

        {/* Atmosphere inner glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c3aed]/20 via-transparent to-[#06b6d4]/15" />

        {/* Dot grid (continents) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {globeDots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="#8b5cf6"
              opacity={dot.opacity}
            />
          ))}
        </svg>

        {/* Glass highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/[0.07]" />
        <div className="absolute top-[8%] left-[15%] w-[40%] h-[30%] rounded-full bg-white/[0.04] blur-2xl" />

        {/* Edge atmosphere glow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(139,92,246,0.3),inset_0_0_80px_rgba(59,130,246,0.15)]" />
      </motion.div>

      {/* Connection arcs */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
        {/* Arc 1 */}
        <motion.path
          d="M 130 180 Q 200 80, 280 160"
          stroke="url(#arc1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0, ease: "easeInOut" }}
        />
        {/* Arc 2 */}
        <motion.path
          d="M 160 250 Q 200 120, 290 200"
          stroke="url(#arc2)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
        />
        {/* Arc 3 */}
        <motion.path
          d="M 140 200 Q 250 100, 300 230"
          stroke="url(#arc3)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 3, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="arc1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0"/>
            <stop offset="50%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="arc2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/>
            <stop offset="50%" stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="arc3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/>
            <stop offset="50%" stopColor="#22d3ee"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Pulsing data points on globe surface */}
      {[
        { top: "32%", left: "38%", delay: 0, color: "#06b6d4" },
        { top: "45%", left: "58%", delay: 1.2, color: "#8b5cf6" },
        { top: "55%", left: "42%", delay: 2.5, color: "#3b82f6" },
        { top: "38%", left: "52%", delay: 0.6, color: "#06b6d4" },
        { top: "50%", left: "35%", delay: 3.2, color: "#8b5cf6" },
        { top: "42%", left: "62%", delay: 1.8, color: "#22d3ee" },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: dot.top, left: dot.left }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1.5, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        >
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot.color, boxShadow: `0 0 8px ${dot.color}80` }} />
        </motion.div>
      ))}

      {/* Orbital rings */}
      <div className="absolute inset-[-8px] sm:inset-[-12px] rounded-full border border-[#7c3aed]/15" style={{ transform: "rotateX(72deg) rotateZ(-15deg)" }} />
      <div className="absolute inset-[-28px] sm:inset-[-38px] rounded-full border border-[#06b6d4]/10" style={{ transform: "rotateX(76deg) rotateZ(35deg)" }} />
      <div className="absolute inset-[-48px] sm:inset-[-62px] rounded-full border border-white/[0.03]" style={{ transform: "rotateX(80deg) rotateZ(-5deg)" }} />

      {/* Floating social icons */}
      {socialIcons.map(({ Icon, label, color, top, left, delay }) => (
        <motion.div
          key={label}
          className="absolute z-10"
          style={{ top, left }}
          animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.1] bg-[#0e0e2a]/90 backdrop-blur-xl"
            style={{ boxShadow: `0 4px 20px ${color}25` }}
          >
            <Icon />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
