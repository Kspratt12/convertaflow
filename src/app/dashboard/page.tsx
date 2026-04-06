"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "New Leads", value: "47", change: "+12%", icon: Users },
  { label: "Reviews Collected", value: "23", change: "+8%", icon: Star },
  { label: "Emails Sent", value: "156", change: "+24%", icon: Mail },
  { label: "Conversion Rate", value: "4.2%", change: "+0.6%", icon: TrendingUp },
];

const recentLeads = [
  { name: "David Park", email: "david@parkservices.com", source: "Website", time: "2 min ago", status: "New" },
  { name: "Lisa Chen", email: "lisa@chengroup.com", source: "Google", time: "18 min ago", status: "New" },
  { name: "Mike Torres", email: "mike@torresconstruction.com", source: "Referral", time: "1 hour ago", status: "Contacted" },
  { name: "Rachel Adams", email: "rachel@adamslaw.com", source: "Website", time: "3 hours ago", status: "Contacted" },
  { name: "James Wilson", email: "james@wilsonplumbing.com", source: "Google", time: "5 hours ago", status: "Converted" },
];

const recentActivity = [
  { action: "Review request sent", target: "Jennifer Adams", time: "3 min ago", type: "review" },
  { action: "New lead captured", target: "David Park", time: "5 min ago", type: "lead" },
  { action: "Follow-up email delivered", target: "Marcus Chen", time: "12 min ago", type: "email" },
  { action: "Review completed", target: "Sarah Mitchell", time: "1 hour ago", type: "review" },
  { action: "Contact form submission", target: "Lisa Chen", time: "2 hours ago", type: "lead" },
  { action: "Email opened", target: "James Wilson", time: "3 hours ago", type: "email" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Welcome back, Sarah</h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Here&apos;s how your business is performing this month.
          </p>
        </div>
        <Button size="sm" className="gap-1.5" asChild>
          <Link href="/dashboard/leads">
            View All Leads
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/60">
                  <stat.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <span className="flex items-center gap-0.5 text-[12px] font-semibold text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
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
            {[25, 40, 35, 55, 45, 65, 50, 70, 60, 80, 68, 85, 72, 90, 78, 95, 82, 88, 76, 92, 85, 98, 90, 95].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/20 to-primary/50 transition-all hover:to-primary/70"
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Leads */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-[14px] font-semibold">Recent Leads</CardTitle>
            <Link href="/dashboard/leads" className="text-[12px] font-medium text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {recentLeads.map((lead) => (
              <div key={lead.email} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{lead.name}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{lead.email}</p>
                </div>
                <div className="ml-3 flex items-center gap-2 shrink-0">
                  <Badge
                    variant={lead.status === "Converted" ? "default" : lead.status === "Contacted" ? "secondary" : "outline"}
                    className="text-[11px] px-2 py-0.5"
                  >
                    {lead.status}
                  </Badge>
                  <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground whitespace-nowrap">
                    <Clock className="h-2.5 w-2.5" />
                    {lead.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-[14px] font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0">
                <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  activity.type === "lead" ? "bg-blue-500" : activity.type === "review" ? "bg-amber-500" : "bg-emerald-500"
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px]">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-muted-foreground"> — {activity.target}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
