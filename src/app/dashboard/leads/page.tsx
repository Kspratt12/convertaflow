import { Clock, Users, UserPlus, CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { canAccessFeature } from "@/lib/tier";
import { TierGate } from "@/components/dashboard/tier-gate";
import type { TierId } from "@/lib/types";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  status: "New" | "Contacted" | "Converted" | "Lost";
  message: string | null;
  created_at: string;
}

function formatRelative(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function loadLeads(businessId: string): Promise<LeadRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leads")
    .select("id, name, email, phone, source, status, message, created_at")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false })
    .limit(100);
  return (data ?? []) as LeadRow[];
}

export default async function LeadsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const tier = session.profile.plan_tier as TierId;
  if (!canAccessFeature(tier, "leads")) {
    return (
      <TierGate
        requiredTier="growth"
        featureName="Lead Tracking"
        featureDescription="Capture every lead from your website, track their status, and never let one slip through. Included with Growth and above."
      />
    );
  }

  const leads = await loadLeads(session.profile.id);

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    converted: leads.filter((l) => l.status === "Converted").length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Leads</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Every lead from your website forms — captured, tracked, ready to follow up.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total" value={counts.total} icon={Users} />
        <SummaryCard label="New" value={counts.new} icon={UserPlus} />
        <SummaryCard label="Contacted" value={counts.contacted} icon={Clock} />
        <SummaryCard label="Converted" value={counts.converted} icon={CheckCircle2} />
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[14px] text-muted-foreground">No leads yet.</p>
              <p className="mt-1 text-[12px] text-muted-foreground/70">
                As soon as someone fills out a form on your site, they&apos;ll show up here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Name
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Source
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Status
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Received
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border/30 hover:bg-muted/30"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] font-medium">{lead.name}</p>
                        <p className="text-[12px] text-muted-foreground">{lead.email}</p>
                        {lead.message && (
                          <p className="mt-0.5 text-[11px] text-muted-foreground/80 max-w-md truncate">
                            {lead.message}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-[12px] text-muted-foreground">
                        {lead.source || "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            lead.status === "Converted"
                              ? "default"
                              : lead.status === "Contacted"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-[11px]"
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatRelative(lead.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Users;
}) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-[12px] text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
