"use client";

import { useEffect, useRef, useCallback } from "react";
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

/* ─── HQ data ─── */
const hqs = [
  { id: "google",    label: "Google HQ",      city: "Mountain View, CA",   color: "#34A853", lat: 37.4220, lng: -122.0841, Icon: GoogleIcon },
  { id: "facebook",  label: "Meta HQ",        city: "Menlo Park, CA",      color: "#1877F2", lat: 37.4530, lng: -122.1817, Icon: FacebookIcon },
  { id: "instagram", label: "Instagram HQ",   city: "San Francisco, CA",   color: "#E4405F", lat: 37.7749, lng: -122.4194, Icon: InstagramIcon },
  { id: "tiktok",    label: "TikTok US HQ",   city: "Culver City, CA",     color: "#7c3aed", lat: 34.0211, lng: -118.3965, Icon: TikTokIcon },
];

const desktopIcons = [
  { top: "5%",  left: "68%", delay: 0 },
  { top: "30%", left: "82%", delay: 1 },
  { top: "62%", left: "78%", delay: 2 },
  { top: "82%", left: "45%", delay: 3 },
];
const mobileIcons = [
  { top: "2%",  left: "60%", delay: 0 },
  { top: "25%", left: "80%", delay: 1 },
  { top: "58%", left: "76%", delay: 2 },
  { top: "80%", left: "40%", delay: 3 },
];

/* Cobe's exact projection (from source) */
function project(lat: number, lng: number, phi: number, theta: number, size: number) {
  const lr = (lat * Math.PI) / 180;
  const lr2 = (lng * Math.PI) / 180;
  const cl = Math.cos(lr), sl = Math.sin(lr);
  const cp = Math.cos(phi + lr2), sp = Math.sin(phi + lr2);
  const ct = Math.cos(theta), st = Math.sin(theta);
  const R = 0.80;
  const h = size / 2;
  return {
    x: h * (1 + cl * cp * R),
    y: h * (1 - (st * cl * sp + ct * sl) * R),
    vis: -ct * cl * sp + st * sl >= 0,
  };
}

export function HeroGlobe({ mobile = false }: { mobile?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const phiRef = useRef(2.13); // Centers on California (lng -122°)
  const rafRef = useRef(0);
  const visibleRef = useRef(true); // IntersectionObserver tracks this
  const theta = 0.3;

  const cSize = mobile ? 260 : 400;
  const cW = mobile ? 280 : 400;
  const cH = mobile ? 280 : 400;
  const oX = (cW - cSize) / 2;
  const oY = (cH - cSize) / 2;
  const icons = mobile ? mobileIcons : desktopIcons;

  const updateAllArrows = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    for (let i = 0; i < 4; i++) {
      const hq = hqs[i];
      const icon = icons[i];
      const p = project(hq.lat, hq.lng, phiRef.current, theta, cSize);

      const path = svg.querySelector(`[data-p="${i}"]`) as SVGPathElement | null;
      const dot = svg.querySelector(`[data-d="${i}"]`) as SVGCircleElement | null;
      if (!path || !dot) continue;

      if (!p.vis) {
        path.setAttribute("opacity", "0");
        dot.setAttribute("opacity", "0");
        continue;
      }

      // Arrow from CENTER of icon
      const iconSize = mobile ? 28 : 36;
      const ix = (parseFloat(icon.left) / 100) * cW + iconSize / 2;
      const iy = (parseFloat(icon.top) / 100) * cH + iconSize / 2;
      const mx = p.x + oX;
      const my = p.y + oY;

      const dist = Math.sqrt((mx - ix) ** 2 + (my - iy) ** 2);
      const curve = Math.min(dist * 0.12, mobile ? 15 : 25);
      const dx = mx - ix, dy = my - iy;
      const nx = -dy / (dist || 1), ny = dx / (dist || 1);
      const cpx = (ix + mx) / 2 + nx * curve;
      const cpy = (iy + my) / 2 + ny * curve;

      path.setAttribute("d", `M${ix},${iy} Q${cpx},${cpy} ${mx},${my}`);
      path.setAttribute("opacity", "1");
      path.setAttribute("stroke", hq.color);
      dot.setAttribute("cx", String(mx));
      dot.setAttribute("cy", String(my));
      dot.setAttribute("opacity", "1");
      dot.setAttribute("fill", hq.color);
    }
  }, [cSize, cW, cH, oX, oY, icons, mobile]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio ?? 2, 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: cSize * dpr,
      height: cSize * dpr,
      phi: phiRef.current,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.1, 0.35],
      markerColor: [0.486, 0.227, 0.929],
      glowColor: [0.2, 0.1, 0.5],
      markers: [],
    });

    /* Pause rendering when off-screen (saves GPU) */
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(container);

    /*
     * Time-based rotation: phi is always derived from elapsed time,
     * so the globe is at the correct position even after being
     * off-screen or paused during scroll — never misses a beat.
     */
    let active = true;
    const speed = mobile ? 0.003 : 0.004;
    const startTime = performance.now();
    const startPhi = phiRef.current;

    function animate() {
      if (!active) return;
      rafRef.current = requestAnimationFrame(animate);
      // Always compute correct phi from elapsed time
      const elapsed = (performance.now() - startTime) / 16.667; // ~frames at 60fps
      phiRef.current = startPhi + elapsed * speed;
      // Only render when visible (but phi stays correct regardless)
      if (!visibleRef.current) return;
      globe.update({ phi: phiRef.current });
      updateAllArrows();
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      globe.destroy();
    };
  }, [mobile, cSize, updateAllArrows]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${mobile ? "w-[280px] h-[280px] overflow-hidden" : "w-[400px] h-[400px]"}`}
    >
      {!mobile && (
        <>
          <div className="absolute inset-[5%] rounded-full bg-[#7c3aed]/15 blur-[50px]" />
          <div className="absolute inset-[10%] rounded-full bg-[#3b82f6]/10 blur-[40px]" />
        </>
      )}

      <canvas ref={canvasRef} style={{ width: cSize, height: cSize, pointerEvents: "none", touchAction: "auto" }} />

      {/* SVG kept (refs used by updateAllArrows) but lines hidden */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ display: "none" }}>
        {hqs.map((hq, i) => (
          <g key={hq.id}>
            <path data-p={i} d="M0,0 Q0,0 0,0" stroke={hq.color} fill="none" opacity="0" />
            <circle data-d={i} cx="0" cy="0" r="0" fill={hq.color} opacity="0" />
          </g>
        ))}
      </svg>

      {icons.map((pos, i) => {
        const hq = hqs[i];
        const Ic = hq.Icon;
        return (
          <div
            key={hq.id}
            className="absolute z-20"
            style={{
              top: pos.top,
              left: pos.left,
              ...(mobile ? {} : { animation: `bob ${3.5 + pos.delay}s ${pos.delay}s ease-in-out infinite` }),
            }}
          >
            <div
              className={`flex items-center justify-center rounded-xl border border-white/[0.1] bg-[#0e0e2a]/90 ${mobile ? "h-7 w-7" : "h-9 w-9"}`}
              style={{ boxShadow: `0 3px 12px ${hq.color}20` }}
            >
              <Ic />
            </div>
          </div>
        );
      })}
    </div>
  );
}
