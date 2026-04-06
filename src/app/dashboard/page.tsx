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
  {
    label: "New Leads",
    value: "47",
    change: "+12%",
    changeLabel: "vs last month",
    icon: Users,
  },
  {
    label: "Reviews Collected",
    value: "23",
    change: "+8%",
    changeLabel: "vs last month",
    icon: Star,
  },
  {
    label: "Emails Sent",
    value: "156",
    change: "+24%",
    changeLabel: "vs last month",
    icon: Mail,
  },
  {
    label: "Conversion Rate",
    value: "4.2%",
    change: "+0.6%",
    changeLabel: "vs last month",
    icon: TrendingUp,
  },
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
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, Sarah
          </h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s how your business is performing this month.
          </p>
        </div>
        <Button size="sm" asChild>
          <Link href="/dashboard/leads">
            View All Leads
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead Activity Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Lead Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-40">
            {[25, 40, 35, 55, 45, 65, 50, 70, 60, 80, 68, 85, 72, 90, 78, 95, 82, 88, 76, 92, 85, 98, 90, 95].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-primary/30 to-primary/60 transition-all hover:to-primary/80"
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>4 weeks ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">Recent Leads</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/leads">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {recentLeads.map((lead) => (
                <div
                  key={lead.email}
                  className="flex items-center justify-between border-b py-3 last:border-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{lead.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {lead.email}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-3 shrink-0">
                    <Badge
                      variant={
                        lead.status === "Converted"
                          ? "default"
                          : lead.status === "Contacted"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {lead.status}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                      <Clock className="h-3 w-3" />
                      {lead.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b py-3 last:border-0 last:pb-0"
                >
                  <div
                    className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                      activity.type === "lead"
                        ? "bg-blue-500"
                        : activity.type === "review"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span>
                      {" — "}
                      <span className="text-muted-foreground">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
