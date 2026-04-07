"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  ClipboardList,
  Upload,
  Activity,
  Edit3,
  HelpCircle,
  Package,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { useBusiness } from "@/components/dashboard/business-provider";
import { tierShortLabel } from "@/lib/tier";

const navigation = [
  { label: "Overview", href: "/portal", icon: Home },
  { label: "Onboarding", href: "/portal/onboarding", icon: ClipboardList },
  { label: "Uploads", href: "/portal/uploads", icon: Upload },
  { label: "Project Status", href: "/portal/project", icon: Activity },
  { label: "Revisions", href: "/portal/revisions", icon: Edit3 },
  { label: "Delivery", href: "/portal/delivery", icon: Package },
  { label: "Billing", href: "/portal/billing", icon: CreditCard },
  { label: "Support", href: "/portal/support", icon: HelpCircle },
];

export function PortalSidebar() {
  const pathname = usePathname();
  const { businessName, tier } = useBusiness();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-white/[0.06] bg-[#060613] lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/[0.06] px-5">
        <Image
          src="/convertaflow-logo.png"
          alt={SITE.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold tracking-tight text-white/90">
            {businessName}
          </p>
          <p className="text-[11px] text-white/40">{tierShortLabel(tier)} Plan</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
          Client Portal
        </p>
        {navigation.map((item) => {
          const active =
            item.href === "/portal"
              ? pathname === "/portal"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors",
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

      <div className="border-t border-white/[0.06] p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white/60"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Growth Dashboard
        </Link>
      </div>
    </aside>
  );
}
