import { redirect } from "next/navigation";
import {
  ExternalLink,
  Globe,
  Eye,
  LayoutDashboard,
  Package,
  LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

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
  other: { label: "Other", icon: LinkIcon, style: "bg-white text-slate-500 border-white/[0.1]" },
};

export default async function DeliveryPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const supabase = await createClient();
  const { data } = await supabase
    .from("delivery_links")
    .select("id, label, url, link_type, notes")
    .eq("business_id", session.profile.id)
    .order("created_at", { ascending: false });

  const links: DeliveryLink[] = (data as DeliveryLink[]) || [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Delivery</h1>
        <p className="mt-1 text-[13px] text-slate-900/45 sm:text-[14px]">
          Access your project deliverables. Preview links, live site, and dashboard access.
        </p>
      </div>

      {links.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 py-20 text-center sm:p-6 sm:py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#3b82f6]/10">
              <Package className="h-7 w-7 text-slate-400" />
            </div>
            <div className="max-w-sm">
              <p className="text-[15px] font-semibold text-slate-500 sm:text-[16px]">
                Your project hasn&apos;t been delivered yet
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-900/35">
                We&apos;ll add your preview link, live site URL, and dashboard access here once everything is ready. You&apos;ll be notified by email when delivery links are available.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Delivery link cards */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {links.map((link) => {
            const config = TYPE_CONFIG[link.link_type];
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-white/[0.12] hover:bg-white/[0.05] sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <config.icon className="h-5 w-5 text-[#06b6d4]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-slate-900">
                        {link.label}
                      </p>
                      <p className="mt-0.5 max-w-[200px] truncate text-[12px] text-slate-500">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-300 transition-colors group-hover:text-slate-500" />
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
                    <span className="truncate text-[11px] text-slate-400">
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
