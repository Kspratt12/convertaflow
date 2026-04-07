import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { TIERS } from "@/lib/constants";
import { getStatusInfo } from "@/lib/project-status";
import type { TierId } from "@/lib/types";
import { ProjectControls } from "./project-controls";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProjectDetailPage({ params }: PageProps) {
  const session = await getSession();
  if (!session || session.profile.role !== "admin") {
    redirect("/dashboard");
  }

  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("business_profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!profile) notFound();

  const tier = TIERS[profile.plan_tier as TierId];

  const { data: statusRow } = await supabase
    .from("project_status")
    .select("*")
    .eq("business_id", id)
    .maybeSingle();

  const { data: deliveryLinks } = await supabase
    .from("delivery_links")
    .select("*")
    .eq("business_id", id)
    .order("created_at", { ascending: false });

  const info = getStatusInfo(statusRow?.status);

  return (
    <div className="space-y-5">
      {/* Back link */}
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All projects
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-white sm:text-2xl">{profile.business_name}</h1>
            <div className="mt-2 flex flex-wrap gap-3 text-[12px] text-white/50">
              {profile.business_email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {profile.business_email}
                </span>
              )}
              {profile.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {profile.phone}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-white/60">
              {tier?.shortName || profile.plan_tier} · {tier?.price}
            </span>
            <span
              className={
                info.tone === "emerald"
                  ? "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400"
                  : info.tone === "amber"
                  ? "rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400"
                  : info.tone === "purple"
                  ? "rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#a78bfa]"
                  : info.tone === "blue"
                  ? "rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#06b6d4]"
                  : "rounded-full border border-white/[0.1] bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-semibold text-white/60"
              }
            >
              {info.label}
            </span>
          </div>
        </div>
      </div>

      <ProjectControls
        businessId={id}
        currentStatus={statusRow?.status || "not_started"}
        currentNotes={statusRow?.notes || ""}
        deliveryLinks={deliveryLinks || []}
      />
    </div>
  );
}
