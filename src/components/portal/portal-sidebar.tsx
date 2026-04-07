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
  Shield,
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
  { label: "Request a Change", href: "/portal/revisions", icon: Edit3 },
  { label: "Delivery", href: "/portal/delivery", icon: Package },
  { label: "Billing", href: "/portal/billing", icon: CreditCard },
  { label: "Support", href: "/portal/support", icon: HelpCircle },
];

export function PortalSidebar() {
  const pathname = usePathname();
  const { businessName, tier, isAdmin } = useBusiness();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-slate-50 lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5">
        <Image
          src="/convertaflow-logo.png"
          alt={SITE.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold tracking-tight text-slate-900">
            {businessName}
          </p>
          <p className="text-[11px] text-slate-500">{tierShortLabel(tier)} Plan</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
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
                  ? "bg-white text-slate-900"
                  : "text-slate-500 hover:bg-white hover:text-slate-800"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  active ? "text-[#06b6d4]" : "text-slate-400"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 transition-colors hover:bg-white hover:text-slate-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Growth Dashboard
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 transition-colors hover:bg-white hover:text-slate-700"
          >
            <Shield className="h-3.5 w-3.5" />
            Admin Panel
          </Link>
        )}
      </div>
    </aside>
  );
}
