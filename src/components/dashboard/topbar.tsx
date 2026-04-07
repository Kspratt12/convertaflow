"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SITE } from "@/lib/constants";
import { useBusiness } from "@/components/dashboard/business-provider";

export function DashboardTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { userEmail, userInitials, businessName } = useBusiness();

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-6">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-md p-2 lg:hidden hover:bg-accent"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden flex-1 md:block" />

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-medium leading-tight">{businessName}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">{userEmail}</p>
              </div>
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
            <span className="text-sm font-bold">{businessName}</span>
          </div>
          <nav className="space-y-1">
            {["Overview", "Leads", "Reviews", "Email Activity", "Settings"].map((item) => (
              <Link
                key={item}
                href={`/dashboard${item === "Overview" ? "" : `/${item.toLowerCase().replace(" activity", "").replace(" ", "-")}`}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
