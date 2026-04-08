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
  ArrowUpRight,
  FolderOpen,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { useBusiness } from "@/components/dashboard/business-provider";
import { tierLabel } from "@/lib/tier";
import type { DashboardFeature } from "@/lib/tier";
import type { TierId } from "@/lib/types";

const navigation: {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  feature: DashboardFeature;
  requiresTier: TierId;
}[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, feature: "overview", requiresTier: "starter" },
  { label: "Project", href: "/dashboard/project", icon: Users, feature: "project", requiresTier: "starter" },
  { label: "Leads", href: "/dashboard/leads", icon: Users, feature: "leads", requiresTier: "growth" },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star, feature: "reviews", requiresTier: "growth" },
  { label: "Email", href: "/dashboard/email", icon: Mail, feature: "email", requiresTier: "growth" },
  { label: "Social", href: "/dashboard/social", icon: Share2, feature: "social", requiresTier: "scale" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, feature: "settings", requiresTier: "starter" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { can, tier, businessName, isAdmin } = useBusiness();

  // Find next upgrade tier
  const nextTier: TierId | null =
    tier === "starter" ? "growth" : tier === "growth" ? "scale" : null;

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/50 bg-card lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-border/50 px-5">
        <Image
          src="/convertaflow-logo.png"
          alt={SITE.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold tracking-tight">{businessName}</p>
          <p className="text-[11px] text-muted-foreground/60">{tierLabel(tier)}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Menu
        </p>
        {navigation
          .filter((item) => can(item.feature))
          .map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
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
        <div className="my-2 h-px mx-3 bg-border/30" />
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Project
        </p>
        <Link
          href="/portal"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <FolderOpen className="h-4 w-4" />
          Client Portal
        </Link>
        {isAdmin && (
          <>
            <div className="my-2 h-px mx-3 bg-border/30" />
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Admin
            </p>
            <Link
              href="/admin"
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <Shield className="h-4 w-4" />
              Admin Panel
            </Link>
          </>
        )}
      </nav>

      {nextTier && (
        <div className="border-t border-border/50 p-4">
          <div className="rounded-xl bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] border border-primary/10 p-4">
            <p className="text-[12px] font-semibold text-primary">
              {tierLabel(tier)}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Upgrade to {tierLabel(nextTier)} to unlock more features.
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
      )}
    </aside>
  );
}
