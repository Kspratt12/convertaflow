"use client";

import { useState } from "react";
import {
  ExternalLink,
  Globe,
  Eye,
  LayoutDashboard,
  Package,
  LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryLink {
  id: string;
  label: string;
  url: string;
  link_type: "preview" | "live" | "dashboard" | "other";
  notes: string | null;
}

const TYPE_CONFIG = {
  preview: { label: "Preview", icon: Eye, style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  live: { label: "Live Site", icon: Globe, style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  dashboard: { label: "Dashboard", icon: LayoutDashboard, style: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  other: { label: "Other", icon: LinkIcon, style: "bg-white/[0.06] text-white/50 border-white/[0.1]" },
};

export default function DeliveryPage() {
  const [links] = useState<DeliveryLink[]>([]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white/90">Delivery</h1>
        <p className="mt-1 text-[14px] text-white/50">
          Access your project deliverables — preview links, live site, and dashboard access.
        </p>
      </div>

      {links.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] py-20 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#3b82f6]/10">
              <Package className="h-7 w-7 text-white/20" />
            </div>
            <div className="max-w-sm">
              <p className="text-[16px] font-semibold text-white/60">
                Your project hasn&apos;t been delivered yet
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/35">
                We will add your preview link, live site URL, and dashboard access here once everything is ready. You will be notified when delivery links are available.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Delivery link cards */
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => {
            const config = TYPE_CONFIG[link.link_type];
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
                      <config.icon className="h-5 w-5 text-[#06b6d4]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-white/90">
                        {link.label}
                      </p>
                      <p className="mt-0.5 text-[12px] text-white/40 truncate max-w-[200px]">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/20 transition-colors group-hover:text-white/50" />
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                      config.style
                    )}
                  >
                    {config.label}
                  </span>
                  {link.notes && (
                    <span className="text-[11px] text-white/30 truncate">
                      {link.notes}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
