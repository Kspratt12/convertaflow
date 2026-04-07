"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SITE } from "@/lib/constants";
import { useBusiness } from "@/components/dashboard/business-provider";

const mobileNav = [
  { label: "Overview", href: "/portal", icon: Home },
  { label: "Onboarding", href: "/portal/onboarding", icon: ClipboardList },
  { label: "Uploads", href: "/portal/uploads", icon: Upload },
  { label: "Project Status", href: "/portal/project", icon: Activity },
  { label: "Revisions", href: "/portal/revisions", icon: Edit3 },
  { label: "Support", href: "/portal/support", icon: HelpCircle },
  { label: "Delivery", href: "/portal/delivery", icon: Package },
];

export function PortalTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { userEmail, userInitials, businessName } = useBusiness();

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#060613] px-6">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-md p-2 lg:hidden text-white/60 hover:text-white hover:bg-white/[0.06]"
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
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/[0.06]"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-[#7c3aed]/20 to-[#3b82f6]/20 text-[#06b6d4] text-xs font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-medium leading-tight text-white/90">
                  {businessName}
                </p>
                <p className="text-[11px] leading-tight text-white/40">
                  {userEmail}
                </p>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-white/[0.08] bg-[#0a0a1a] p-1 shadow-lg z-50">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                >
                  Settings
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                >
                  Growth Dashboard
                </Link>
                <Link
                  href="/"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
                >
                  Back to website
                </Link>
                <div className="my-1 h-px bg-white/[0.06]" />
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-white/[0.06]"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="border-b border-white/[0.06] bg-[#060613] px-4 pb-4 lg:hidden">
          <div className="flex items-center gap-2 py-3">
            <Image
              src="/convertaflow-logo.png"
              alt={SITE.name}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-sm font-bold text-white/90">{businessName}</span>
          </div>
          <nav className="space-y-1">
            {mobileNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-white/50 hover:bg-white/[0.06] hover:text-white"
              >
                <item.icon className="h-4 w-4 text-white/30" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
