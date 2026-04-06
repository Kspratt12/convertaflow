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
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, tier: "starter" as const },
  { label: "Leads", href: "/dashboard/leads", icon: Users, tier: "starter" as const },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star, tier: "growth" as const },
  { label: "Email Activity", href: "/dashboard/email", icon: Mail, tier: "growth" as const },
  { label: "Social", href: "/dashboard/social", icon: Share2, tier: "scale" as const },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, tier: "starter" as const },
];

const CURRENT_TIER = "growth";
const tierLevel = { starter: 0, growth: 1, scale: 2 };

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/50 bg-card lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-border/50 px-5">
        <Image
          src="/logo.png"
          alt={SITE.name}
          width={26}
          height={26}
          className="h-[26px] w-[26px] object-contain"
        />
        <span className="text-[15px] font-bold tracking-tight">{SITE.name}</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Menu
        </p>
        {navigation.map((item) => {
          const active = pathname === item.href;
          const locked = tierLevel[item.tier] > tierLevel[CURRENT_TIER];

          return (
            <Link
              key={item.href}
              href={locked ? "#" : item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "bg-primary/[0.07] text-primary"
                  : locked
                  ? "text-muted-foreground/35 cursor-not-allowed"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {locked && <Lock className="ml-auto h-3 w-3 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/50 p-4">
        <div className="rounded-xl bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] border border-primary/10 p-4">
          <p className="text-[12px] font-semibold text-primary">Reviews + Dashboard</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Upgrade to Full Growth Bundle for social tools and advanced analytics.
          </p>
          <Link
            href="/pricing"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
          >
            Upgrade
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
