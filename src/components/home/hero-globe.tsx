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
const hqLocations = [
  { id: "google",    label: "Google HQ",      city: "Mountain View, CA",   color: "#34A853", lat: 37.4220, lng: -122.0841, Icon: GoogleIcon },
  { id: "facebook",  label: "Meta HQ",        city: "Menlo Park, CA",      color: "#1877F2", lat: 37.4530, lng: -122.1817, Icon: FacebookIcon },
  { id: "instagram", label: "Instagram HQ",   city: "San Francisco, CA",   color: "#E4405F", lat: 37.7749, lng: -122.4194, Icon: InstagramIcon },
  { id: "tiktok",    label: "TikTok US HQ",   city: "Culver City, CA",     color: "#7c3aed", lat: 34.0211, lng: -118.3965, Icon: TikTokIcon },
];

const desktopIconPositions = [
  { id: "google",    top: "5%",  left: "68%", delay: 0 },
  { id: "facebook",  top: "30%", left: "82%", delay: 1 },
  { id: "instagram", top: "62%", left: "78%", delay: 2 },
  { id: "tiktok",    top: "82%", left: "45%", delay: 3 },
];

const mobileIconPositions = [
  { id: "google",    top: "2%",  left: "60%", delay: 0 },
  { id: "facebook",  top: "25%", left: "80%", delay: 1 },
  { id: "instagram", top: "58%", left: "76%", delay: 2 },
  { id: "tiktok",    top: "80%", left: "40%", delay: 3 },
];

/*
 * Projection — matches cobe's EXACT internal math (from cobe source: function O + U).
 *
 * Cobe converts [lat,lng] → 3D via:
 *   U = [cos(lat)*cos(lng), sin(lat), -cos(lat)*sin(lng)]
 * Then projects with rotation (phi, theta) to screen:
 *   c = cos(phi)*x + sin(phi)*z  →  screenX = (c + 1) / 2
 *   s = sin(phi)*sin(theta)*x + cos(theta)*y - cos(phi)*sin(theta)*z  →  screenY = (-s + 1) / 2
 * Markers are at radius 0.85 (globe radius 0.8 + elevation 0.05).
 */
function latLngToPixel(
  lat: number, lng: number, phi: number, theta: number, size: number
): { x: number; y: number; visible: boolean } {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const R = 0.80; // cobe globe surface radius — arrow lands ON the continent, not floating above

  const cosLat = Math.cos(latRad);
  const sinLat = Math.sin(latRad);
  const cosPhiLng = Math.cos(phi + lngRad);
  const sinPhiLng = Math.sin(phi + lngRad);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  const c = cosLat * cosPhiLng * R;
  const s = (sinTheta * cosLat * sinPhiLng + cosTheta * sinLat) * R;

  const half = size / 2;
  return {
    x: half * (1 + c),
    y: half * (1 - s),
    visible: -cosTheta * cosLat * sinPhiLng + sinTheta * sinLat >= 0,
  };
}

const CYCLE_MS = 4000;

export function HeroGlobe({ mobile = false }: { mobile?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowSvgRef = useRef<SVGSVGElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const arrowElsRef = useRef<{
    path: SVGPathElement; arrow: SVGPolygonElement; dot: SVGCircleElement;
    stop1: SVGStopElement; stop2: SVGStopElement;
    name: Element; city: Element; card: HTMLElement; caret: HTMLElement;
  } | null>(null);
  const phiRef = useRef(3.5);
  const theta = 0.3;
  const activeIdxRef = useRef(0);
  const prevIdxRef = useRef(0);
  const transitionRef = useRef(1); // 0 = faded out, 1 = fully visible
  const rafRef = useRef<number>(0);

  const canvasSize = mobile ? 260 : 400;
  const containerW = mobile ? 280 : 400;
  const containerH = mobile ? 280 : 400;
  const globeOffsetX = (containerW - canvasSize) / 2;
  const globeOffsetY = (containerH - canvasSize) / 2;
  const iconPositions = mobile ? mobileIconPositions : desktopIconPositions;

  const updateArrowDOM = useCallback(() => {
    const svg = arrowSvgRef.current;
    const label = labelRef.current;
    if (!svg || !label) return;

    // Smooth fade transition when switching HQs
    const idx = activeIdxRef.current;
    if (idx !== prevIdxRef.current) {
      transitionRef.current = 0; // start fade in for new HQ
      prevIdxRef.current = idx;
    }
    // Ease in: 0 → 1 over ~20 frames (~0.33s at 60fps)
    if (transitionRef.current < 1) {
      transitionRef.current = Math.min(1, transitionRef.current + 0.05);
    }

    const loc = hqLocations[idx];
    const iconPos = (mobile ? mobileIconPositions : desktopIconPositions)[idx];

    const pos = latLngToPixel(loc.lat, loc.lng, phiRef.current, theta, canvasSize);

    if (!pos.visible) {
      svg.style.opacity = "0";
      label.style.opacity = "0";
      return;
    }

    const fadeOpacity = String(transitionRef.current);

    const iconX = (parseFloat(iconPos.left) / 100) * containerW;
    const iconY = (parseFloat(iconPos.top) / 100) * containerH;
    const mx = pos.x + globeOffsetX;
    const my = pos.y + globeOffsetY;

    // Gentle curve — small perpendicular offset scaled by distance
    const midX = (iconX + mx) / 2;
    const midY = (iconY + my) / 2;
    const dist = Math.sqrt((mx - iconX) ** 2 + (my - iconY) ** 2);
    const curveAmount = Math.min(dist * 0.15, mobile ? 20 : 30);
    const dx = mx - iconX;
    const dy = my - iconY;
    const nx = -dy / (dist || 1);
    const ny = dx / (dist || 1);
    const cpx = midX + nx * curveAmount;
    const cpy = midY + ny * curveAmount;

    const angle = Math.atan2(my - cpy, mx - cpx);
    const aLen = mobile ? 5 : 8;
    const a1x = mx - aLen * Math.cos(angle - 0.4);
    const a1y = my - aLen * Math.sin(angle - 0.4);
    const a2x = mx - aLen * Math.cos(angle + 0.4);
    const a2y = my - aLen * Math.sin(angle + 0.4);

    if (!arrowElsRef.current) {
      const p = svg.querySelector("[data-arrow-path]") as SVGPathElement;
      const a = svg.querySelector("[data-arrow-head]") as SVGPolygonElement;
      const d = svg.querySelector("[data-arrow-dot]") as SVGCircleElement;
      const s1 = svg.querySelector("[data-arrow-stop1]") as SVGStopElement;
      const s2 = svg.querySelector("[data-arrow-stop2]") as SVGStopElement;
      const nm = label.querySelector("[data-label-name]")!;
      const ct = label.querySelector("[data-label-city]")!;
      const cd = label.querySelector("[data-label-card]") as HTMLElement;
      const cr = label.querySelector("[data-label-caret]") as HTMLElement;
      if (p && a && d && s1 && s2 && nm && ct && cd && cr) {
        arrowElsRef.current = { path: p, arrow: a, dot: d, stop1: s1, stop2: s2, name: nm, city: ct, card: cd, caret: cr };
      }
    }

    const els = arrowElsRef.current;
    if (!els) return;

    els.path.setAttribute("d", `M ${iconX} ${iconY} Q ${cpx} ${cpy}, ${mx} ${my}`);
    els.arrow.setAttribute("points", `${mx},${my} ${a1x},${a1y} ${a2x},${a2y}`);
    els.dot.setAttribute("cx", String(mx));
    els.dot.setAttribute("cy", String(my));
    els.stop1.setAttribute("stop-color", loc.color);
    els.stop2.setAttribute("stop-color", loc.color);
    els.arrow.setAttribute("fill", loc.color);
    els.dot.setAttribute("fill", loc.color);

    svg.style.opacity = fadeOpacity;

    label.style.opacity = fadeOpacity;
    label.style.left = `${mx - (mobile ? 40 : 50)}px`;
    label.style.top = `${my - (mobile ? 42 : 55)}px`;
    els.name.textContent = loc.label;
    els.city.textContent = loc.city;
    els.card.style.boxShadow = `0 4px 16px ${loc.color}30`;
    els.caret.style.borderTopColor = `${loc.color}60`;
  }, [canvasSize, containerW, containerH, globeOffsetX, globeOffsetY, mobile]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const dpr = mobile ? 1 : Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 2, 2);

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: canvasSize * dpr,
      height: canvasSize * dpr,
      phi: phiRef.current,
      theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: mobile ? 4000 : 16000,
      mapBrightness: mobile ? 4 : 6,
      baseColor: [0.15, 0.1, 0.35],
      markerColor: [0.486, 0.227, 0.929],
      glowColor: [0.2, 0.1, 0.5],
      markers: hqLocations.map((loc) => ({
        location: [loc.lat, loc.lng] as [number, number],
        size: mobile ? 0.04 : 0.06,
      })),
    });

    let active = true;
    let frame = 0;
    function animate() {
      if (!active) return;
      frame++;
      phiRef.current += 0.004;
      globe.update({ phi: phiRef.current });

      // Desktop: update arrow every frame
      // Mobile: update arrow every 3rd frame to save CPU
      if (!mobile || frame % 3 === 0) {
        updateArrowDOM();
      }

      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    const cycleTimer = setInterval(() => {
      activeIdxRef.current = (activeIdxRef.current + 1) % hqLocations.length;
    }, CYCLE_MS);

    return () => {
      active = false;
      cancelAnimationFrame(rafRef.current);
      clearInterval(cycleTimer);
      globe.destroy();
    };
  }, [mobile, canvasSize, updateArrowDOM]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${
        mobile ? "w-[280px] h-[280px]" : "w-[400px] h-[400px]"
      }`}
    >
      {/* CSS keyframes for icon bobbing — zero JS overhead */}
      <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>

      {/* Glow — desktop only */}
      {!mobile && (
        <>
          <div className="absolute inset-[5%] rounded-full bg-[#7c3aed]/15 blur-[50px]" />
          <div className="absolute inset-[10%] rounded-full bg-[#3b82f6]/10 blur-[40px]" />
        </>
      )}

      <canvas ref={canvasRef} style={{ width: canvasSize, height: canvasSize }} />

      {/* Arrow + label */}
      <svg
        ref={arrowSvgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        style={{ opacity: 0 }}
      >
        <defs>
          <linearGradient id={`ag-${mobile ? "m" : "d"}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop data-arrow-stop1 offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop data-arrow-stop2 offset="100%" stopColor="#fff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          data-arrow-path d="M 0 0 Q 0 0, 0 0"
          stroke={`url(#ag-${mobile ? "m" : "d"})`}
          strokeWidth={mobile ? 1.5 : 2} fill="none"
          strokeLinecap="round" strokeDasharray="5 3"
        />
        <polygon data-arrow-head points="0,0 0,0 0,0" fill="#fff" opacity="0.9" />
        <circle data-arrow-dot cx="0" cy="0" r={mobile ? 3 : 4} fill="#fff" opacity="0.85">
          <animate attributeName="r" values={mobile ? "3;5;3" : "4;6;4"} dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.85;0.4;0.85" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div ref={labelRef} className="absolute z-30 pointer-events-none" style={{ opacity: 0 }}>
        <div data-label-card className={`rounded-lg border border-white/[0.12] bg-[#0e0e2a]/95 px-2.5 py-1.5 shadow-xl whitespace-nowrap ${mobile ? "" : "backdrop-blur-sm"}`}>
          <p data-label-name className={`font-bold text-white/90 ${mobile ? "text-[9px]" : "text-[10px]"}`} />
          <p data-label-city className={`text-white/50 ${mobile ? "text-[8px]" : "text-[9px]"}`} />
        </div>
        <div data-label-caret className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent"
          style={{ borderTopColor: "#ffffff60", marginLeft: mobile ? 34 : 44 }} />
      </div>

      {/* Social icons — CSS animation only, zero JS */}
      {iconPositions.map(({ id, top, left, delay }) => {
        const loc = hqLocations.find((h) => h.id === id)!;
        const IconComp = loc.Icon;
        return (
          <div
            key={id}
            className="absolute z-20"
            style={{ top, left, animation: `bob ${3.5 + delay}s ${delay}s ease-in-out infinite` }}
          >
            <div
              className={`flex items-center justify-center rounded-xl border border-white/[0.1] bg-[#0e0e2a]/90 ${
                mobile ? "h-7 w-7" : "h-9 w-9"
              }`}
              style={{ boxShadow: `0 3px 12px ${loc.color}20` }}
            >
              <IconComp />
            </div>
          </div>
        );
      })}
    </div>
  );
}
