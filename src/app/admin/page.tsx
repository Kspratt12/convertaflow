import { Card, CardContent } from "@/components/ui/card";
import { Users, Sparkles, Clock, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface Stat {
  label: string;
  value: string;
  hint?: string;
  icon: typeof Users;
}

async function loadAdminStats(): Promise<Stat[]> {
  const supabase = await createClient();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [totalCustomersRes, activeSubsRes, activeProjectsRes, newThisMonthRes] =
    await Promise.all([
      // Customers = anyone with a business_profile that isn't an admin
      supabase
        .from("business_profiles")
        .select("id", { count: "exact", head: true })
        .neq("role", "admin"),
      // Active subscriptions = plan_status = 'active'
      supabase
        .from("business_profiles")
        .select("id", { count: "exact", head: true })
        .neq("role", "admin")
        .eq("plan_status", "active"),
      // Active projects = anything not delivered/completed
      supabase
        .from("project_status")
        .select("id", { count: "exact", head: true })
        .not("status", "in", "(delivered,completed)"),
      // New this month
      supabase
        .from("business_profiles")
        .select("id", { count: "exact", head: true })
        .neq("role", "admin")
        .gte("created_at", thirtyDaysAgo),
    ]);

  return [
    {
      label: "Total Customers",
      value: (totalCustomersRes.count ?? 0).toString(),
      icon: Users,
    },
    {
      label: "Active Subscriptions",
      value: (activeSubsRes.count ?? 0).toString(),
      hint: "plan_status = active",
      icon: Sparkles,
    },
    {
      label: "Active Projects",
      value: (activeProjectsRes.count ?? 0).toString(),
      hint: "in build, review, or revisions",
      icon: Clock,
    },
    {
      label: "New This Month",
      value: `+${newThisMonthRes.count ?? 0}`,
      hint: "last 30 days",
      icon: TrendingUp,
    },
  ];
}

export default async function AdminDashboard() {
  const stats = await loadAdminStats();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-[13px] text-white/40">
          Live snapshot of every Convertaflow account.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-white/[0.06] bg-white/[0.03]">
            <CardContent className="p-4">
              <s.icon className="h-4 w-4 text-white/40" />
              <p className="mt-2 text-2xl font-bold text-white/90">{s.value}</p>
              <p className="text-[12px] text-white/40">{s.label}</p>
              {s.hint && (
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/25">
                  {s.hint}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
