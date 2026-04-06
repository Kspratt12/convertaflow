"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

/** HQ locations: lat/lng → projected to globe SVG coords */
const hqLocations = [
  { id: "google", label: "Google HQ", city: "Mountain View, CA", lat: 37.4, lng: -122.1, color: "#4285F4" },
  { id: "facebook", label: "Meta HQ", city: "Menlo Park, CA", lat: 37.5, lng: -122.2, color: "#1877F2" },
  { id: "instagram", label: "Instagram HQ", city: "San Francisco, CA", lat: 37.8, lng: -122.4, color: "#E4405F" },
  { id: "tiktok", label: "TikTok US HQ", city: "Culver City, CA", lat: 34.0, lng: -118.4, color: "#69C9D0" },
];

function latLngToXY(lat: number, lng: number) {
  const x = 50 + (lng + 40) * 0.38;
  const y = 50 - lat * 0.52;
  return { x: Math.max(8, Math.min(92, x)), y: Math.max(8, Math.min(92, y)) };
}

const socialIcons = [
  { Icon: GoogleIcon, hqId: "google", color: "#4285F4", top: "2%", left: "75%", delay: 0 },
  { Icon: FacebookIcon, hqId: "facebook", color: "#1877F2", top: "30%", left: "96%", delay: 1 },
  { Icon: InstagramIcon, hqId: "instagram", color: "#E4405F", top: "72%", left: "88%", delay: 2 },
  { Icon: TikTokIcon, hqId: "tiktok", color: "#69C9D0", top: "90%", left: "55%", delay: 3 },
];

/** Simplified real-world continent outlines as dot arrays [lat, lng] */
const continentDots: [number, number][] = [
  // North America
  ...[
    [70,-160],[68,-155],[65,-168],[62,-165],[60,-160],[58,-155],[55,-160],[52,-170],
    [70,-140],[68,-135],[65,-130],[63,-125],[60,-120],[58,-125],[55,-130],[50,-125],
    [48,-120],[45,-122],[42,-124],[40,-122],[38,-121],[36,-120],[34,-118],[32,-117],
    [30,-115],[28,-110],[26,-100],[25,-97],[27,-95],[29,-90],[30,-88],[28,-82],
    [25,-80],[23,-82],[20,-87],[18,-90],[16,-92],[15,-88],[18,-75],[20,-73],
    [22,-78],[25,-77],[27,-80],[30,-85],[32,-80],[35,-75],[38,-74],[40,-74],
    [42,-72],[44,-68],[45,-66],[47,-64],[48,-60],[50,-58],[52,-56],[55,-60],
    [58,-65],[60,-70],[62,-75],[65,-80],[68,-85],[70,-90],[70,-100],[70,-110],
    [70,-120],[70,-130],[68,-140],[65,-145],[60,-148],[58,-150],[55,-150],
    [50,-130],[48,-125],[45,-115],[42,-110],[40,-105],[38,-100],[36,-95],
    [34,-90],[32,-85],[35,-80],[38,-78],[40,-80],[42,-82],[44,-78],[46,-75],
    [48,-70],[50,-65],[52,-60],[55,-55],
  ] as [number, number][],
  // South America
  ...[
    [12,-72],[10,-75],[8,-77],[5,-76],[2,-78],[0,-80],[-2,-79],[-5,-78],
    [-8,-75],[-10,-72],[-12,-76],[-15,-75],[-18,-65],[-20,-60],[-22,-55],
    [-25,-57],[-28,-55],[-30,-52],[-32,-58],[-34,-56],[-36,-60],[-38,-62],
    [-40,-65],[-42,-63],[-44,-66],[-46,-68],[-48,-70],[-50,-72],[-52,-70],
    [10,-68],[8,-65],[5,-60],[2,-55],[0,-50],[-2,-48],[-5,-45],[-8,-40],
    [-10,-38],[-12,-40],[-15,-42],[-18,-45],[-20,-48],[-22,-50],[-25,-50],
    [-28,-48],[-30,-50],[-5,-55],[-8,-50],[-10,-48],[-12,-45],[-15,-50],
  ] as [number, number][],
  // Europe
  ...[
    [70,25],[68,20],[65,15],[62,10],[60,5],[58,0],[55,-5],[52,-8],[50,-5],
    [48,0],[46,2],[44,5],[42,3],[40,0],[38,-5],[36,-8],[35,-5],[38,0],
    [40,5],[42,8],[44,10],[46,12],[48,15],[50,18],[52,20],[54,22],[56,25],
    [58,28],[60,30],[62,32],[64,28],[66,25],[68,30],[65,35],[62,38],
    [60,35],[58,32],[56,28],[54,25],[52,22],[50,20],[48,18],[46,15],
    [44,12],[42,15],[40,18],[38,22],[36,25],[40,25],[42,28],[44,30],
    [46,32],[48,35],[50,38],[55,35],[58,38],[60,40],[55,40],[50,42],
  ] as [number, number][],
  // Africa
  ...[
    [35,0],[33,-5],[30,-8],[28,-12],[25,-15],[22,-16],[18,-16],[15,-17],
    [12,-15],[10,-12],[8,-8],[5,-5],[2,-8],[0,-10],[-2,-8],[-5,-12],
    [-8,-12],[-10,-15],[-12,-18],[-15,-20],[-18,-22],[-20,-25],[-22,-28],
    [-25,-30],[-28,-28],[-30,-25],[-32,-22],[-34,-20],[-35,-18],
    [30,10],[28,15],[25,20],[22,25],[18,30],[15,32],[12,35],[10,38],
    [8,40],[5,38],[2,35],[0,30],[-2,32],[-5,35],[-8,38],[-10,40],
    [-12,38],[-15,35],[-18,32],[-20,30],[-22,28],[-25,28],[-28,25],
    [-30,28],[-32,30],[-34,28],[20,35],[15,40],[10,42],[5,42],[0,38],
    [35,10],[33,15],[30,20],[28,25],[25,30],[22,32],[18,35],[15,38],
  ] as [number, number][],
  // Asia
  ...[
    [70,40],[68,50],[65,60],[62,70],[60,80],[58,90],[55,100],[52,110],
    [50,120],[48,130],[45,135],[42,140],[40,130],[38,120],[36,110],
    [34,105],[32,100],[30,95],[28,90],[26,85],[24,80],[22,78],[20,75],
    [18,72],[15,78],[12,80],[10,78],[8,75],[5,80],[2,100],[0,105],
    [-2,110],[-5,115],[-8,118],[70,60],[68,70],[65,80],[62,90],
    [60,100],[58,110],[55,120],[52,130],[50,135],[48,140],[45,142],
    [40,120],[38,115],[36,108],[34,100],[32,95],[30,90],[28,85],
    [26,80],[22,72],[20,68],[18,65],[15,70],[12,75],[10,80],
    [55,65],[52,70],[50,75],[48,80],[45,85],[42,90],[40,95],
    [38,100],[36,105],[34,110],[32,115],[30,118],[28,120],
  ] as [number, number][],
  // Australia
  ...[
    [-12,130],[-15,128],[-18,125],[-20,118],[-22,115],[-25,114],
    [-28,115],[-30,118],[-32,120],[-34,122],[-35,128],[-36,135],
    [-38,140],[-37,145],[-35,148],[-33,150],[-30,152],[-28,153],
    [-25,150],[-22,148],[-20,145],[-18,142],[-15,140],[-12,135],
    [-20,130],[-22,132],[-25,135],[-28,138],[-30,140],[-32,142],
    [-25,142],[-22,140],[-18,135],[-15,133],
  ] as [number, number][],
];

function worldDotsToSVG() {
  return continentDots.map(([lat, lng]) => {
    const pos = latLngToXY(lat, lng);
    return pos;
  });
}

const mappedDots = worldDotsToSVG();

export function HeroGlobe({ mobile = false }: { mobile?: boolean }) {
  const [activeHQ, setActiveHQ] = useState<string | null>(null);
  const activeLocation = hqLocations.find((h) => h.id === activeHQ);
  const activeXY = activeLocation ? latLngToXY(activeLocation.lat, activeLocation.lng) : null;

  return (
    <div className={mobile ? "relative flex items-center justify-center w-full h-full" : "relative flex items-center justify-center w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]"}>
      {/* Deep outer glow */}
      <div className={`absolute inset-[-20%] rounded-full bg-[#7c3aed]/20 ${mobile ? "blur-[40px]" : "blur-[80px]"}`} />
      <div className={`absolute inset-[-10%] rounded-full bg-[#3b82f6]/15 animate-pulse ${mobile ? "blur-[30px]" : "blur-[60px]"}`} />

      {/* Globe sphere */}
      <motion.div
        className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full overflow-hidden"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {/* Base sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a0a4e] via-[#0f1b5e] to-[#0a2a6e]" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c3aed]/20 via-transparent to-[#06b6d4]/15" />

        {/* Real world map dots */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          {mappedDots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={0.55} fill="#8b5cf6" opacity={0.3 + Math.random() * 0.2} />
          ))}
        </svg>

        {/* Glass highlight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/[0.07]" />
        <div className="absolute top-[8%] left-[15%] w-[40%] h-[30%] rounded-full bg-white/[0.04] blur-2xl" />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(139,92,246,0.3),inset_0_0_80px_rgba(59,130,246,0.15)]" />
      </motion.div>

      {/* Connection arcs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" fill="none">
        <motion.path d="M 130 180 Q 200 80, 280 160" stroke="url(#arc1)" strokeWidth="1.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        <motion.path d="M 160 250 Q 200 120, 290 200" stroke="url(#arc2)" strokeWidth="1" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5, ease: "easeInOut" }} />
        <motion.path d="M 140 200 Q 250 100, 300 230" stroke="url(#arc3)" strokeWidth="1" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 3, ease: "easeInOut" }} />
        <defs>
          <linearGradient id="arc1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0"/><stop offset="50%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/></linearGradient>
          <linearGradient id="arc2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0"/><stop offset="50%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/></linearGradient>
          <linearGradient id="arc3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/><stop offset="50%" stopColor="#22d3ee"/><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient>
        </defs>
      </svg>

      {/* Pulsing data points */}
      {[
        { top: "32%", left: "38%", delay: 0, color: "#06b6d4" },
        { top: "45%", left: "58%", delay: 1.2, color: "#8b5cf6" },
        { top: "55%", left: "42%", delay: 2.5, color: "#3b82f6" },
        { top: "38%", left: "52%", delay: 0.6, color: "#06b6d4" },
        { top: "50%", left: "35%", delay: 3.2, color: "#8b5cf6" },
      ].map((dot, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={{ top: dot.top, left: dot.left }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1.5, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}>
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dot.color, boxShadow: `0 0 8px ${dot.color}80` }} />
        </motion.div>
      ))}

      {/* Orbital rings */}
      <div className="absolute inset-[-8px] sm:inset-[-12px] rounded-full border border-[#7c3aed]/15 pointer-events-none" style={{ transform: "rotateX(72deg) rotateZ(-15deg)" }} />
      <div className="absolute inset-[-28px] sm:inset-[-38px] rounded-full border border-[#06b6d4]/10 pointer-events-none" style={{ transform: "rotateX(76deg) rotateZ(35deg)" }} />
      <div className="absolute inset-[-48px] sm:inset-[-62px] rounded-full border border-white/[0.03] pointer-events-none" style={{ transform: "rotateX(80deg) rotateZ(-5deg)" }} />

      {/* HQ location popup */}
      <AnimatePresence>
        {activeLocation && activeXY && (
          <motion.div
            className="absolute z-30 pointer-events-none"
            style={{
              top: `${30 + activeXY.y * 0.4}%`,
              left: `${20 + activeXY.x * 0.6}%`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            {/* Ping ring */}
            <div className="absolute -inset-3 rounded-full animate-ping" style={{ backgroundColor: `${activeLocation.color}15`, border: `1px solid ${activeLocation.color}30` }} />

            <div className="relative rounded-xl border border-white/[0.1] bg-[#0e0e2a]/95 px-3.5 py-2.5 backdrop-blur-xl shadow-xl" style={{ boxShadow: `0 8px 30px ${activeLocation.color}30` }}>
              <p className="text-[11px] font-bold text-white/90">{activeLocation.label}</p>
              <p className="text-[10px] text-white/50">{activeLocation.city}</p>
              {/* Connecting dot */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full" style={{ backgroundColor: activeLocation.color, boxShadow: `0 0 10px ${activeLocation.color}` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating social icons — clickable */}
      {socialIcons.map(({ Icon, hqId, color, top, left, delay }) => (
        <motion.button
          key={hqId}
          className="absolute z-20 cursor-pointer"
          style={{ top, left }}
          animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
          onClick={() => setActiveHQ(activeHQ === hqId ? null : hqId)}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-xl transition-all duration-200 ${
              activeHQ === hqId
                ? "border-white/30 bg-[#0e0e2a] scale-110"
                : "border-white/[0.1] bg-[#0e0e2a]/90 hover:border-white/20 hover:scale-105"
            }`}
            style={{ boxShadow: activeHQ === hqId ? `0 4px 25px ${color}40` : `0 4px 20px ${color}25` }}
          >
            <Icon />
          </div>
        </motion.button>
      ))}
    </div>
  );
}
