"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-gradient-to-r from-[#110722]/95 via-[#0e0e38]/95 to-[#081848]/95 backdrop-blur-xl shadow-lg shadow-black/30"
          : "bg-gradient-to-r from-[#1a0a3e] via-[#12124a] to-[#0a1e5e]"
      )}
    >
      {/* Glossy shine overlay — fades on scroll */}
      <div className={cn(
        "pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent h-[60%] transition-opacity duration-300",
        scrolled ? "opacity-30" : "opacity-100"
      )} />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt={SITE.name}
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11 object-contain"
            priority
          />
          <span className="text-[17px] sm:text-lg font-bold tracking-tight text-white">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                pathname === link.href
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
          >
            Log in
          </Link>
          <Button
            size="sm"
            className="gap-1.5 px-4 bg-white/10 border border-white/15 text-white hover:bg-white/20 backdrop-blur-sm"
            asChild
          >
            <Link href="/pricing">
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg md:hidden text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#0e0826]/98 backdrop-blur-xl px-4 pb-5 md:hidden">
          <nav className="flex flex-col gap-0.5 pt-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/15 px-3 py-2.5 text-center text-sm font-medium text-white/80"
              >
                Log in
              </Link>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-3 py-2.5 text-center text-sm font-medium text-white"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
