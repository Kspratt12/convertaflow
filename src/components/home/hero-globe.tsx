"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allContinentCoords } from "./world-dots";

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>;
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

const hqLocations = [
  { id: "google", label: "Google HQ", city: "Mountain View, CA", color: "#4285F4" },
  { id: "facebook", label: "Meta HQ", city: "Menlo Park, CA", color: "#1877F2" },
  { id: "instagram", label: "Instagram HQ", city: "San Francisco, CA", color: "#E4405F" },
  { id: "tiktok", label: "TikTok US HQ", city: "Culver City, CA", color: "#69C9D0" },
];

function projectToSphere(lat: number, lng: number, centerLng: number = -30): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = ((lng - centerLng) * Math.PI) / 180;
  const x = Math.cos(latRad) * Math.sin(lngRad);
  const y = -Math.sin(latRad);
  const z = Math.cos(latRad) * Math.cos(lngRad);
  return { x: 50 + x * 45, y: 50 + y * 45, visible: z > 0 };
}

const socialIcons = [
  { Icon: GoogleIcon, hqId: "google", color: "#4285F4", top: "5%", left: "68%", delay: 0 },
  { Icon: FacebookIcon, hqId: "facebook", color: "#1877F2", top: "30%", left: "80%", delay: 1 },
  { Icon: InstagramIcon, hqId: "instagram", color: "#E4405F", top: "62%", left: "75%", delay: 2 },
  { Icon: TikTokIcon, hqId: "tiktok", color: "#69C9D0", top: "82%", left: "42%", delay: 3 },
];

function GlobeSphere({ dots, mobile }: { dots: { x: number; y: number }[]; mobile: boolean }) {
  const content = (
    <>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a0a4e] via-[#0f1b5e] to-[#0a2a6e]" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c3aed]/15 via-transparent to-[#06b6d4]/10" />
      {[-60, -30, 0, 30, 60].map((lat) => {
        const yPos = 50 - (lat / 90) * 45;
        const width = Math.cos((lat * Math.PI) / 180) * 90;
        return <div key={lat} className="absolute border-t border-white/[0.04]" style={{ top: `${yPos}%`, left: `${50 - width / 2}%`, width: `${width}%` }} />;
      })}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={mobile ? 0.6 : 0.5} fill="#a78bfa" opacity={0.55} />
        ))}
      </svg>
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/[0.06]" />
      <div className="absolute top-[8%] left-[18%] w-[30%] h-[20%] rounded-full bg-white/[0.03] blur-lg" />
      <div className="absolute inset-0 rounded-full shadow-[inset_0_0_25px_rgba(139,92,246,0.2),inset_0_0_50px_rgba(59,130,246,0.08)]" />
    </>
  );

  if (mobile) {
    return <div className="relative w-[85%] h-[85%] rounded-full overflow-hidden">{content}</div>;
  }

  return (
    <motion.div
      className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full overflow-hidden"
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
    >
      {content}
    </motion.div>
  );
}

export function HeroGlobe({ mobile = false }: { mobile?: boolean }) {
  const [activeHQ, setActiveHQ] = useState<string | null>(null);
  const activeLocation = hqLocations.find((h) => h.id === activeHQ);

  const dots = useMemo(() => {
    return allContinentCoords.map(([lat, lng]) => projectToSphere(lat, lng)).filter((d) => d.visible);
  }, []);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${mobile ? "w-full h-full" : "w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]"}`}>
      {/* Glow — stays inside parent */}
      <div className={`absolute inset-[5%] rounded-full bg-[#7c3aed]/15 ${mobile ? "blur-[25px]" : "blur-[50px]"}`} />
      <div className={`absolute inset-[10%] rounded-full bg-[#3b82f6]/10 ${mobile ? "blur-[20px]" : "blur-[40px]"}`} />

      <GlobeSphere dots={dots} mobile={mobile} />

      {/* Connection arcs — desktop only */}
      {!mobile && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" fill="none">
          <motion.path d="M 130 180 Q 200 100, 280 170" stroke="url(#garc1)" strokeWidth="1.5" strokeLinecap="round" fill="none"
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M 150 240 Q 210 130, 285 210" stroke="url(#garc2)" strokeWidth="1" strokeLinecap="round" fill="none"
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.35, 0.35, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }} />
          <defs>
            <linearGradient id="garc1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0"/><stop offset="50%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/></linearGradient>
            <linearGradient id="garc2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/><stop offset="50%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/></linearGradient>
          </defs>
        </svg>
      )}

      {/* Orbital rings — desktop only */}
      {!mobile && (
        <>
          <div className="absolute inset-[2%] rounded-full border border-[#7c3aed]/10 pointer-events-none" style={{ transform: "rotateX(72deg) rotateZ(-15deg)" }} />
          <div className="absolute inset-[-2%] rounded-full border border-[#06b6d4]/6 pointer-events-none" style={{ transform: "rotateX(76deg) rotateZ(35deg)" }} />
        </>
      )}

      {/* HQ popup */}
      <AnimatePresence>
        {activeLocation && (
          <motion.div className="absolute z-30 pointer-events-none top-[18%] left-[22%]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="rounded-xl border border-white/[0.1] bg-[#0e0e2a]/95 px-3 py-2 shadow-xl" style={{ boxShadow: `0 6px 20px ${activeLocation.color}20` }}>
              <p className="text-[10px] font-bold text-white/90">{activeLocation.label}</p>
              <p className="text-[9px] text-white/50">{activeLocation.city}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social icons — all screens */}
      {socialIcons.map(({ Icon, hqId, color, top, left, delay }) => (
        <motion.button key={hqId} className="absolute z-20 cursor-pointer" style={{ top, left }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
          onClick={() => setActiveHQ(activeHQ === hqId ? null : hqId)}>
          <div className={`flex ${mobile ? "h-7 w-7" : "h-9 w-9"} items-center justify-center rounded-xl border transition-all duration-200 ${
            activeHQ === hqId ? "border-white/30 bg-[#0e0e2a] scale-110" : "border-white/[0.1] bg-[#0e0e2a]/90"
          }`} style={{ boxShadow: `0 3px 12px ${color}20` }}>
            <Icon />
          </div>
        </motion.button>
      ))}
    </div>
  );
}
