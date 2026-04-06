"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Star,
  Mail,
  Share2,
  Settings,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    tier: "starter" as const,
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
    icon: Users,
    tier: "starter" as const,
  },
  {
    label: "Reviews",
    href: "/dashboard/reviews",
    icon: Star,
    tier: "growth" as const,
  },
  {
    label: "Email Activity",
    href: "/dashboard/email",
    icon: Mail,
    tier: "growth" as const,
  },
  {
    label: "Social",
    href: "/dashboard/social",
    icon: Share2,
    tier: "scale" as const,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    tier: "starter" as const,
  },
];

// Demo: simulate "growth" tier for preview
const CURRENT_TIER = "growth";
const tierLevel = { starter: 0, growth: 1, scale: 2 };

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span className="text-base font-bold tracking-tight">
            {SITE.name}
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const locked =
              tierLevel[item.tier] > tierLevel[CURRENT_TIER];

            return (
              <Link
                key={item.href}
                href={locked ? "#" : item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : locked
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {locked && <Lock className="ml-auto h-3 w-3" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <div className="rounded-lg bg-primary/5 p-3">
            <p className="text-xs font-semibold text-primary">
              Reviews + Dashboard
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Upgrade to unlock social tools and advanced analytics.
            </p>
            <Link
              href="/pricing"
              className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
            >
              View upgrade options
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
