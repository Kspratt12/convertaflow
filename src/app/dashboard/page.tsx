import {
  Users,
  Star,
  Mail,
  TrendingUp,
  ArrowUpRight,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/* ------------------------------------------------------------------ */
/* Data loaders                                                        */
/* ------------------------------------------------------------------ */

interface LeadRow {
  id: string;
  name: string;
  email: string;
  status: "New" | "Contacted" | "Converted" | "Lost";
  created_at: string;
}

interface ActivityRow {
  id: string;
  action: string;
  target: string | null;
  type: "lead" | "review" | "email" | "social" | "system";
  created_at: string;
}

interface DashboardData {
  businessName: string;
  firstName: string;
  stats: {
    newLeads: number;
    reviews: number;
    emails: number;
    conversionRate: number;
    newLeadsChange: number | null;
    reviewsChange: number | null;
    emailsChange: number | null;
    conversionRateChange: number | null;
  };
  leadActivity: number[]; // 24 buckets, most recent last
  recentLeads: LeadRow[];
  recentActivity: ActivityRow[];
}

async function loadDashboard(businessId: string, businessName: string): Promise<DashboardData> {
  const supabase = await createClient();

  // Period windows (last 30 days vs the 30 days before that)
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const twentyFourDaysAgo = new Date(now.getTime() - 24 * 24 * 60 * 60 * 1000);

  const [
    leadsCurrent,
    leadsPrevious,
    leadsConverted,
    leadsConvertedPrev,
    reviewsCurrent,
    reviewsPrevious,
    emailsCurrent,
    emailsPrevious,
    leadsForChart,
    recentLeadsRes,
    recentActivityRes,
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .gte("created_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .gte("created_at", sixtyDaysAgo.toISOString())
      .lt("created_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("status", "Converted")
      .gte("created_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("status", "Converted")
      .gte("created_at", sixtyDaysAgo.toISOString())
      .lt("created_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("review_requests")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("status", "Completed")
      .gte("sent_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("review_requests")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .eq("status", "Completed")
      .gte("sent_at", sixtyDaysAgo.toISOString())
      .lt("sent_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("email_events")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .gte("created_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("email_events")
      .select("id", { count: "exact", head: true })
      .eq("business_id", businessId)
      .gte("created_at", sixtyDaysAgo.toISOString())
      .lt("created_at", thirtyDaysAgo.toISOString()),
    supabase
      .from("leads")
      .select("created_at")
      .eq("business_id", businessId)
      .gte("created_at", twentyFourDaysAgo.toISOString()),
    supabase
      .from("leads")
      .select("id, name, email, status, created_at")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("activity_logs")
      .select("id, action, target, type, created_at")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const newLeads = leadsCurrent.count ?? 0;
  const prevLeads = leadsPrevious.count ?? 0;
  const converted = leadsConverted.count ?? 0;
  const convertedPrev = leadsConvertedPrev.count ?? 0;
  const reviews = reviewsCurrent.count ?? 0;
  const prevReviews = reviewsPrevious.count ?? 0;
  const emails = emailsCurrent.count ?? 0;
  const prevEmails = emailsPrevious.count ?? 0;

  const conversionRate = newLeads > 0 ? (converted / newLeads) * 100 : 0;
  const prevConversionRate = prevLeads > 0 ? (convertedPrev / prevLeads) * 100 : 0;

  // Build 24-day bucket from raw leads timestamps
  const buckets = Array(24).fill(0);
  for (const row of leadsForChart.data ?? []) {
    const created = new Date(row.created_at as string);
    const daysAgo = Math.floor((now.getTime() - created.getTime()) / (24 * 60 * 60 * 1000));
    if (daysAgo >= 0 && daysAgo < 24) {
      buckets[23 - daysAgo] += 1;
    }
  }

  const firstName = (businessName || "there").split(" ")[0];

  return {
    businessName,
    firstName,
    stats: {
      newLeads,
      reviews,
      emails,
      conversionRate,
      newLeadsChange: percentChange(newLeads, prevLeads),
      reviewsChange: percentChange(reviews, prevReviews),
      emailsChange: percentChange(emails, prevEmails),
      conversionRateChange:
        prevConversionRate === 0 && conversionRate === 0
          ? null
          : percentChange(conversionRate, prevConversionRate),
    },
    leadActivity: buckets,
    recentLeads: (recentLeadsRes.data ?? []) as LeadRow[],
    recentActivity: (recentActivityRes.data ?? []) as ActivityRow[],
  };
}

function percentChange(current: number, previous: number): number | null {
  if (previous === 0) {
    return current === 0 ? null : 100;
  }
  return Math.round(((current - previous) / previous) * 100);
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function DashboardOverview() {
  const session = await getSession();
  if (!session) redirect("/login");

  const data = await loadDashboard(session.profile.id, session.profile.business_name);

  const stats = [
    {
      label: "New Leads",
      value: data.stats.newLeads.toString(),
      change: data.stats.newLeadsChange,
      icon: Users,
    },
    {
      label: "Reviews Collected",
      value: data.stats.reviews.toString(),
      change: data.stats.reviewsChange,
      icon: Star,
    },
    {
      label: "Emails Sent",
      value: data.stats.emails.toString(),
      change: data.stats.emailsChange,
      icon: Mail,
    },
    {
      label: "Conversion Rate",
      value: `${data.stats.conversionRate.toFixed(1)}%`,
      change: data.stats.conversionRateChange,
      icon: TrendingUp,
    },
  ];

  const maxBucket = Math.max(...data.leadActivity, 1);

  // Fresh-account state — true when the customer has zero data yet.
  const isFreshAccount =
    data.stats.newLeads === 0 &&
    data.stats.reviews === 0 &&
    data.stats.emails === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Welcome back, {data.firstName}
          </h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {isFreshAccount
              ? "Welcome to your dashboard. Here's what's next."
              : "Here's how your business is performing this month."}
          </p>
        </div>
        {!isFreshAccount && (
          <Button size="sm" className="gap-1.5" asChild>
            <Link href="/dashboard/leads">
              View All Leads
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </div>

      {/* Fresh account walkthrough — only shown to new customers with zero data */}
      {isFreshAccount && (
        <Card className="border-primary/30 bg-gradient-to-br from-primary/[0.04] to-transparent">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Star className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-[15px] font-bold tracking-tight">
                  You&apos;re all set up. Here&apos;s how this works.
                </h2>
                <ol className="mt-3 space-y-2 text-[13px] text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                      1
                    </span>
                    <span>
                      Finish your project intake in the{" "}
                      <Link
                        href="/portal/onboarding"
                        className="font-semibold text-primary hover:underline"
                      >
                        Client Portal
                      </Link>{" "}
                      so we know what to build.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                      2
                    </span>
                    <span>
                      Track your build progress in{" "}
                      <Link
                        href="/dashboard/project"
                        className="font-semibold text-primary hover:underline"
                      >
                        Project
                      </Link>{" "}
                      as we move through each milestone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                      3
                    </span>
                    <span>
                      Need a change after launch? Submit it in{" "}
                      <Link
                        href="/portal/revisions"
                        className="font-semibold text-primary hover:underline"
                      >
                        Request a Change
                      </Link>{" "}
                      and we&apos;ll handle it.
                    </span>
                  </li>
                </ol>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" className="gap-1.5" asChild>
                    <Link href="/portal/onboarding">
                      Continue Onboarding
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/portal/uploads">Upload Brand Assets</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60">
                  <stat.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                {stat.change !== null && (
                  <span
                    className={`flex items-center gap-0.5 text-[12px] font-semibold ${
                      stat.change >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    <ArrowUpRight
                      className={`h-3 w-3 ${stat.change < 0 ? "rotate-90" : ""}`}
                    />
                    {stat.change >= 0 ? "+" : ""}
                    {stat.change}%
                  </span>
                )}
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[14px] font-semibold">Lead Activity</CardTitle>
            <span className="text-[12px] text-muted-foreground">Last 24 days</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-[3px] h-36">
            {data.leadActivity.map((count, i) => {
              const heightPct = (count / maxBucket) * 100;
              return (
                <div
                  key={i}
                  title={`${count} lead${count === 1 ? "" : "s"}`}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/20 to-primary/50 transition-all hover:to-primary/70"
                  style={{ height: `${Math.max(heightPct, 2)}%` }}
                />
              );
            })}
          </div>
          {data.stats.newLeads === 0 && (
            <p className="mt-4 text-center text-[12px] text-muted-foreground">
              No leads yet. Your chart will fill in as leads come in.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Leads */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-[14px] font-semibold">Recent Leads</CardTitle>
            <Link
              href="/dashboard/leads"
              className="text-[12px] font-medium text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {data.recentLeads.length === 0 ? (
              <p className="py-6 text-center text-[12px] text-muted-foreground">
                No leads yet. New leads will show up here as soon as your forms start getting traffic.
              </p>
            ) : (
              data.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{lead.name}</p>
                    <p className="truncate text-[12px] text-muted-foreground">{lead.email}</p>
                  </div>
                  <div className="ml-3 flex items-center gap-2 shrink-0">
                    <Badge
                      variant={
                        lead.status === "Converted"
                          ? "default"
                          : lead.status === "Contacted"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-[11px] px-2 py-0.5"
                    >
                      {lead.status}
                    </Badge>
                    <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground whitespace-nowrap">
                      <Clock className="h-2.5 w-2.5" />
                      {formatRelative(lead.created_at)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-[14px] font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {data.recentActivity.length === 0 ? (
              <p className="py-6 text-center text-[12px] text-muted-foreground">
                Activity will appear here as you collect leads, send review requests, and track engagement.
              </p>
            ) : (
              data.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0"
                >
                  <div
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      activity.type === "lead"
                        ? "bg-blue-500"
                        : activity.type === "review"
                        ? "bg-amber-500"
                        : activity.type === "email"
                        ? "bg-emerald-500"
                        : activity.type === "social"
                        ? "bg-purple-500"
                        : "bg-slate-400"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px]">
                      <span className="font-medium">{activity.action}</span>
                      {activity.target && (
                        <span className="text-muted-foreground"> — {activity.target}</span>
                      )}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {formatRelative(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
