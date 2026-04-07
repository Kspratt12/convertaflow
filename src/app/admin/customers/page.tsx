import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface CustomerRow {
  id: string;
  business_name: string;
  business_email: string;
  plan_tier: "starter" | "growth" | "scale" | "system_upgrade" | "scale_single";
  plan_status: string;
  created_at: string;
  project_status?: { status: string }[];
}

const tierColors: Record<string, string> = {
  starter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  growth: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  scale: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  scale_single: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  system_upgrade: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const tierLabels: Record<string, string> = {
  starter: "Foundation",
  growth: "Growth",
  scale: "Scale",
  scale_single: "Scale (one-time)",
  system_upgrade: "System Upgrade",
};

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  trial: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  past_due: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  canceled: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

function projectLabel(status?: string): string {
  if (!status) return "—";
  const map: Record<string, string> = {
    onboarding: "Onboarding",
    onboarding_submitted: "Submitted",
    in_progress: "In Progress",
    milestone_25: "25% Done",
    milestone_50: "50% Done",
    milestone_75: "75% Done",
    revision_round: "Revisions",
    completed: "Complete",
    delivered: "Live",
  };
  return map[status] ?? status;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function loadCustomers(): Promise<CustomerRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("business_profiles")
    .select(
      "id, business_name, business_email, plan_tier, plan_status, created_at, project_status(status)"
    )
    .neq("role", "admin")
    .order("created_at", { ascending: false });

  return (data ?? []) as unknown as CustomerRow[];
}

export default async function CustomersPage() {
  const customers = await loadCustomers();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Customers</h1>
        <span className="text-[13px] text-white/40">
          {customers.length} total
        </span>
      </div>

      {customers.length === 0 ? (
        <Card className="border-white/[0.06] bg-white/[0.03]">
          <CardContent className="p-12 text-center">
            <p className="text-[14px] text-white/60">
              No customers yet.
            </p>
            <p className="mt-1 text-[12px] text-white/35">
              Customer accounts will appear here as soon as people sign up.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-white/[0.06] bg-white/[0.03]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">
                      Business
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">
                      Tier
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">
                      Project
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">
                      Joined
                    </th>
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => {
                    const projectStatus = c.project_status?.[0]?.status;
                    const statusKey = c.plan_status?.toLowerCase() ?? "trial";
                    return (
                      <tr
                        key={c.id}
                        className="group border-b border-white/[0.04] hover:bg-white/[0.02] cursor-pointer"
                      >
                        <td className="px-5 py-3.5">
                          <Link
                            href={`/admin/projects/${c.id}`}
                            className="block"
                          >
                            <p className="text-[13px] font-medium text-white/90 group-hover:text-white">
                              {c.business_name || "—"}
                            </p>
                            <p className="text-[11px] text-white/35">
                              {c.business_email || "—"}
                            </p>
                          </Link>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge
                            variant="outline"
                            className={`text-[11px] ${tierColors[c.plan_tier] ?? ""}`}
                          >
                            {tierLabels[c.plan_tier] ?? c.plan_tier}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge
                            variant="outline"
                            className={`text-[11px] capitalize ${statusStyles[statusKey] ?? statusStyles.trial}`}
                          >
                            {c.plan_status || "trial"}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-[12px] text-white/50">
                            {projectLabel(projectStatus)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="flex items-center gap-1 text-[11px] text-white/35">
                            <Clock className="h-3 w-3" />
                            {formatDate(c.created_at)}
                          </span>
                        </td>
                        <td className="px-3 py-3.5">
                          <Link
                            href={`/admin/projects/${c.id}`}
                            aria-label="Open project"
                            className="flex items-center justify-end text-white/30 group-hover:text-white/70"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
