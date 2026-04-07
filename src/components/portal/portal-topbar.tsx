"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  Home,
  ClipboardList,
  Upload,
  Activity,
  Edit3,
  HelpCircle,
  Package,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { useBusiness } from "@/components/dashboard/business-provider";

const mobileNav = [
  { label: "Overview", href: "/portal", icon: Home },
  { label: "Onboarding", href: "/portal/onboarding", icon: ClipboardList },
  { label: "Uploads", href: "/portal/uploads", icon: Upload },
  { label: "Project Status", href: "/portal/project", icon: Activity },
  { label: "Revisions", href: "/portal/revisions", icon: Edit3 },
  { label: "Delivery", href: "/portal/delivery", icon: Package },
  { label: "Billing", href: "/portal/billing", icon: CreditCard },
  { label: "Support", href: "/portal/support", icon: HelpCircle },
];

export function PortalTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { userEmail, userInitials, businessName } = useBusiness();

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [profileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#060613] px-4 sm:h-16 sm:px-6">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-xl p-2 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        <div className="hidden lg:block">
          <p className="text-[13px] font-medium text-white/50">Client Portal</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/[0.06]"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20 text-[#06b6d4] text-xs font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left sm:block">
                <p className="text-[13px] font-medium leading-tight text-white/90">
                  {businessName}
                </p>
                <p className="text-[11px] leading-tight text-white/40">
                  {userEmail}
                </p>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-white/[0.08] bg-[#0a0a1a] p-1.5 shadow-2xl shadow-black/40">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Settings
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Growth Dashboard
                </Link>
                <Link
                  href="/"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  Back to website
                </Link>
                <div className="my-1.5 h-px bg-white/[0.06]" />
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] text-red-400 transition-colors hover:bg-white/[0.06]"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.06] bg-[#060613]/95 px-4 pb-4 backdrop-blur-sm lg:hidden">
          <div className="flex items-center gap-2 py-3">
            <Image
              src="/convertaflow-logo.png"
              alt={SITE.name}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-[13px] font-bold text-white/90">{businessName}</span>
          </div>
          <nav className="space-y-0.5">
            {mobileNav.map((item) => {
              const active =
                item.href === "/portal"
                  ? pathname === "/portal"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-white/[0.06] text-white"
                      : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-4 w-4",
                      active ? "text-[#06b6d4]" : "text-white/30"
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
