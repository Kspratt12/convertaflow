import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { TIERS } from "@/lib/constants";
import { getStatusInfo } from "@/lib/project-status";
import type { TierId } from "@/lib/types";

export default async function AdminProjectsPage() {
  const session = await getSession();
  if (!session || session.profile.role !== "admin") {
    redirect("/dashboard");
  }

  const supabase = await createClient();

  // Pull all businesses + their project status
  const { data: profiles } = await supabase
    .from("business_profiles")
    .select("id, business_name, business_email, plan_tier, plan_status, created_at")
    .order("created_at", { ascending: false });

  const { data: statuses } = await supabase
    .from("project_status")
    .select("business_id, status, updated_at");

  const statusMap = new Map((statuses || []).map((s) => [s.business_id, s]));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Projects</h1>
        <span className="text-[13px] text-white/40">{profiles?.length || 0} total</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Business</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Plan</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Status</th>
                <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {(profiles || []).map((p) => {
                const tier = TIERS[p.plan_tier as TierId];
                const statusRow = statusMap.get(p.id);
                const info = getStatusInfo(statusRow?.status);
                return (
                  <tr
                    key={p.id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-[13px] font-medium text-white/90">{p.business_name}</p>
                      <p className="text-[11px] text-white/35">{p.business_email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-white/60">
                        {tier?.shortName || p.plan_tier}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={
                          info.tone === "emerald"
                            ? "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400"
                            : info.tone === "amber"
                            ? "rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-400"
                            : info.tone === "purple"
                            ? "rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#a78bfa]"
                            : info.tone === "blue"
                            ? "rounded-full border border-[#06b6d4]/30 bg-[#06b6d4]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#06b6d4]"
                            : "rounded-full border border-white/[0.1] bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-medium text-white/60"
                        }
                      >
                        {info.shortLabel}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[11px] text-white/35">
                        {statusRow?.updated_at
                          ? new Date(statusRow.updated_at).toLocaleDateString()
                          : "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-white/[0.04] px-2.5 py-1 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
                      >
                        Manage
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {(!profiles || profiles.length === 0) && (
          <div className="px-5 py-16 text-center">
            <Activity className="mx-auto h-6 w-6 text-white/20" />
            <p className="mt-3 text-[13px] text-white/40">No projects yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
