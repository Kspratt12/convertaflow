"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Users,
  Star,
  Mail,
  Share2,
  Settings as SettingsIcon,
  FolderOpen,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SITE } from "@/lib/constants";
import { useBusiness } from "@/components/dashboard/business-provider";
import { cn } from "@/lib/utils";

const mobileNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Project", href: "/dashboard/project", icon: Users },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Email", href: "/dashboard/email", icon: Mail },
  { label: "Social", href: "/dashboard/social", icon: Share2 },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  { label: "Client Portal", href: "/portal", icon: FolderOpen },
];

export function DashboardTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { userEmail, userInitials, businessName, isAdmin } = useBusiness();

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
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 sm:px-6">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-md p-2 lg:hidden hover:bg-accent"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent"
              aria-label="Open account menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-[12px] text-muted-foreground leading-tight">
                {userEmail}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-popover p-1 shadow-lg z-50">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  Settings
                </Link>
                <Link
                  href="/portal"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  Client Portal
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  href="/"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  Back to website
                </Link>
                <div className="my-1 h-px bg-border" />
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-accent"
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
        <div className="border-b bg-card px-4 pb-4 lg:hidden">
          <div className="flex items-center gap-2 py-3">
            <Image
              src="/convertaflow-logo.png"
              alt={SITE.name}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-sm font-bold truncate">{businessName}</span>
          </div>
          <nav className="space-y-0.5">
            {mobileNav.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/[0.07] text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Shield className="h-4 w-4" />
                Admin Panel
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
