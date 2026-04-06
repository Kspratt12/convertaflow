"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SITE } from "@/lib/constants";

export function DashboardTopbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-6">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-md p-2 lg:hidden hover:bg-accent"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Search */}
        <div className="hidden max-w-sm flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search leads, reviews..." className="pl-9" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  SC
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">
                Sarah Chen
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
                  href="/"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  Back to website
                </Link>
                <div className="my-1 h-px bg-border" />
                <button className="block w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-accent">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="border-b bg-card px-4 pb-4 lg:hidden">
          <div className="flex items-center gap-2 py-3">
            <Image
              src="/logo.png"
              alt={SITE.name}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <span className="text-sm font-bold">{SITE.name}</span>
          </div>
          <nav className="space-y-1">
            {[
              { label: "Overview", href: "/dashboard" },
              { label: "Leads", href: "/dashboard/leads" },
              { label: "Reviews", href: "/dashboard/reviews" },
              { label: "Email Activity", href: "/dashboard/email" },
              { label: "Settings", href: "/dashboard/settings" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
