"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import createGlobe from "cobe";

/* ─── Social Icons ─── */
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

/* ─── HQ locations with REAL lat/lng ─── */
const hqLocations = [
  { id: "google",    label: "Google HQ",      city: "Mountain View, CA",   color: "#4285F4", lat: 37.4220, lng: -122.0841, Icon: GoogleIcon },
  { id: "facebook",  label: "Meta HQ",        city: "Menlo Park, CA",      color: "#1877F2", lat: 37.4530, lng: -122.1817, Icon: FacebookIcon },
  { id: "instagram", label: "Instagram HQ",   city: "San Francisco, CA",   color: "#E4405F", lat: 37.7749, lng: -122.4194, Icon: InstagramIcon },
  { id: "tiktok",    label: "TikTok US HQ",   city: "Culver City, CA",     color: "#69C9D0", lat: 34.0211, lng: -118.3965, Icon: TikTokIcon },
];

/* ─── Icon layout positions around the globe ─── */
const iconPositions = [
  { id: "google",    top: "5%",  left: "68%", delay: 0 },
  { id: "facebook",  top: "30%", left: "82%", delay: 1 },
  { id: "instagram", top: "62%", left: "78%", delay: 2 },
  { id: "tiktok",    top: "82%", left: "45%", delay: 3 },
];

/* ─── Project lat/lng to pixel position on the rendered globe ─── */
function latLngToPixel(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  size: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const cx = Math.cos(latRad) * Math.sin(lngRad + phi);
  const cy = -Math.sin(latRad) * Math.cos(theta) + Math.cos(latRad) * Math.cos(lngRad + phi) * Math.sin(theta);
  const cz = Math.sin(latRad) * Math.sin(theta) + Math.cos(latRad) * Math.cos(lngRad + phi) * Math.cos(theta);

  const radius = size / 2;
  return {
    x: radius + cx * radius * 0.92,
    y: radius - cy * radius * 0.92,
    visible: cz > 0,
  };
}

export function HeroGlobe({ mobile = false }: { mobile?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(3.5); // Start rotated to show Americas
  const theta = 0.3;
  const [activeHQ, setActiveHQ] = useState<string | null>(null);
  const [markerPos, setMarkerPos] = useState<{ x: number; y: number; visible: boolean } | null>(null);
  const activeHQRef = useRef<string | null>(null);
  const rafRef = useRef<number>(0);
  const globeRef = useRef<{ update: (state: Partial<{ phi: number; theta: number }>) => void; destroy: () => void } | null>(null);

  useEffect(() => {
    activeHQRef.current = activeHQ;
  }, [activeHQ]);

  const displaySize = mobile ? 280 : 400;

  const updateMarker = useCallback(() => {
    const id = activeHQRef.current;
    if (!id) {
      setMarkerPos(null);
      return;
    }
    const loc = hqLocations.find((h) => h.id === id);
    if (!loc) return;
    const pos = latLngToPixel(loc.lat, loc.lng, phiRef.current, theta, displaySize);
    setMarkerPos(pos);
  }, [displaySize]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const pixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 2;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: pixelRatio,
      width: displaySize * pixelRatio,
      height: displaySize * pixelRatio,
      phi: phiRef.current,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.1, 0.35],
      markerColor: [0.486, 0.227, 0.929],
      glowColor: [0.2, 0.1, 0.5],
      markers: hqLocations.map((loc) => ({
        location: [loc.lat, loc.lng] as [number, number],
        size: 0.06,
      })),
    });

    globeRef.current = globe;

    // Animation loop
    function animate() {
      phiRef.current += 0.003;
      globe.update({ phi: phiRef.current });
      updateMarker();
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      globe.destroy();
      globeRef.current = null;
    };
  }, [mobile, displaySize, updateMarker]);

  const activeLocation = hqLocations.find((h) => h.id === activeHQ);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden ${
        mobile ? "w-full h-full" : "w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]"
      }`}
    >
      {/* Glow effects */}
      <div className={`absolute inset-[5%] rounded-full bg-[#7c3aed]/15 ${mobile ? "blur-[25px]" : "blur-[50px]"}`} />
      <div className={`absolute inset-[10%] rounded-full bg-[#3b82f6]/10 ${mobile ? "blur-[20px]" : "blur-[40px]"}`} />

      {/* Cobe globe */}
      <canvas
        ref={canvasRef}
        style={{
          width: displaySize,
          height: displaySize,
          contain: "layout paint size",
        }}
      />

      {/* Arrow from icon to HQ location on globe */}
      <AnimatePresence>
        {activeHQ && markerPos && markerPos.visible && (
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const iconPos = iconPositions.find((p) => p.id === activeHQ);
              const loc = hqLocations.find((h) => h.id === activeHQ);
              if (!iconPos || !loc) return null;

              const containerW = containerRef.current?.getBoundingClientRect().width ?? displaySize;
              const containerH = containerRef.current?.getBoundingClientRect().height ?? displaySize;

              // Icon position from percentages
              const iconX = (parseFloat(iconPos.left) / 100) * containerW;
              const iconY = (parseFloat(iconPos.top) / 100) * containerH;

              // Globe is centered in container
              const offsetX = (containerW - displaySize) / 2;
              const offsetY = (containerH - displaySize) / 2;
              const mx = markerPos.x + offsetX;
              const my = markerPos.y + offsetY;

              // Curved control point
              const cpx = (iconX + mx) / 2 + (iconX > mx ? -30 : 30);
              const cpy = (iconY + my) / 2 - 25;

              // Arrowhead
              const angle = Math.atan2(my - cpy, mx - cpx);
              const aLen = 8;
              const a1x = mx - aLen * Math.cos(angle - 0.4);
              const a1y = my - aLen * Math.sin(angle - 0.4);
              const a2x = mx - aLen * Math.cos(angle + 0.4);
              const a2y = my - aLen * Math.sin(angle + 0.4);

              return (
                <g>
                  <defs>
                    <linearGradient id={`arrow-${activeHQ}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={loc.color} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={loc.color} stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={`M ${iconX} ${iconY} Q ${cpx} ${cpy}, ${mx} ${my}`}
                    stroke={`url(#arrow-${activeHQ})`}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="6 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <motion.polygon
                    points={`${mx},${my} ${a1x},${a1y} ${a2x},${a2y}`}
                    fill={loc.color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 0.3 }}
                  />
                  <motion.circle
                    cx={mx}
                    cy={my}
                    r={5}
                    fill={loc.color}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                  <circle cx={mx} cy={my} r={3} fill={loc.color} opacity={0.8} />
                </g>
              );
            })()}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* HQ popup label */}
      <AnimatePresence>
        {activeLocation && markerPos && markerPos.visible && (
          <motion.div
            className="absolute z-30 pointer-events-none"
            style={{
              left: markerPos.x + ((containerRef.current?.getBoundingClientRect().width ?? displaySize) - displaySize) / 2 - 50,
              top: markerPos.y + ((containerRef.current?.getBoundingClientRect().height ?? displaySize) - displaySize) / 2 - 55,
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="rounded-xl border border-white/[0.12] bg-[#0e0e2a]/95 backdrop-blur-sm px-3 py-2 shadow-xl whitespace-nowrap"
              style={{ boxShadow: `0 6px 20px ${activeLocation.color}30` }}
            >
              <p className="text-[10px] font-bold text-white/90">{activeLocation.label}</p>
              <p className="text-[9px] text-white/50">{activeLocation.city}</p>
            </div>
            <div
              className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent"
              style={{ borderTopColor: `${activeLocation.color}60`, marginLeft: 44 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social icons */}
      {iconPositions.map(({ id, top, left, delay }) => {
        const loc = hqLocations.find((h) => h.id === id)!;
        const IconComp = loc.Icon;
        return (
          <motion.button
            key={id}
            className="absolute z-20 cursor-pointer"
            style={{ top, left }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
            onClick={() => setActiveHQ(activeHQ === id ? null : id)}
          >
            <div
              className={`flex ${mobile ? "h-7 w-7" : "h-9 w-9"} items-center justify-center rounded-xl border transition-all duration-200 ${
                activeHQ === id
                  ? "border-white/30 bg-[#0e0e2a] scale-110"
                  : "border-white/[0.1] bg-[#0e0e2a]/90 hover:border-white/20 hover:scale-105"
              }`}
              style={{ boxShadow: activeHQ === id ? `0 4px 20px ${loc.color}40` : `0 3px 12px ${loc.color}20` }}
            >
              <IconComp />
            </div>
          </motion.button>
        );
      })}

      {/* Reviews badge — desktop only */}
      {!mobile && (
        <motion.div
          className="absolute z-20 right-[2%] top-[38%]"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <div className="rounded-xl border border-white/[0.1] bg-[#0e0e2a]/90 px-3 py-2 shadow-lg">
            <div className="flex gap-0.5 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-yellow-400" />
              ))}
            </div>
            <p className="text-[10px] text-white/60 font-medium">23 reviews</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
