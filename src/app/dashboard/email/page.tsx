"use client";

import { Mail, Send, Eye, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const emailStats = [
  { label: "Emails Sent", value: "156", change: "+24%", icon: Send },
  { label: "Delivered", value: "152", change: "97.4%", icon: CheckCircle2 },
  { label: "Opened", value: "118", change: "77.6%", icon: Eye },
  { label: "Clicked", value: "43", change: "28.3%", icon: ArrowUpRight },
];

const recentEmails = [
  { type: "Lead Notification", recipient: "you@business.com", subject: "New lead: David Park", status: "Delivered", time: "2 min ago" },
  { type: "Review Request", recipient: "jennifer@email.com", subject: "We'd love your feedback", status: "Opened", time: "15 min ago" },
  { type: "Follow-up", recipient: "lisa@chengroup.com", subject: "Thanks for your interest", status: "Delivered", time: "1 hour ago" },
  { type: "Lead Notification", recipient: "you@business.com", subject: "New lead: Mike Torres", status: "Delivered", time: "3 hours ago" },
  { type: "Review Request", recipient: "marcus@email.com", subject: "How was your experience?", status: "Clicked", time: "5 hours ago" },
  { type: "Confirmation", recipient: "rachel@adamslaw.com", subject: "We received your message", status: "Delivered", time: "6 hours ago" },
  { type: "Follow-up", recipient: "james@wilsonplumbing.com", subject: "Following up on your inquiry", status: "Opened", time: "1 day ago" },
  { type: "Review Request", recipient: "sarah@email.com", subject: "Share your experience", status: "Clicked", time: "1 day ago" },
];

export default function EmailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Email Activity</h1>
        <p className="text-sm text-muted-foreground">
          Track all email notifications, review requests, and follow-ups.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {emailStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold">{stat.value}</p>
                <span className="text-xs font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery funnel */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Delivery Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-8 justify-center py-4">
            {[
              { label: "Sent", value: 156, pct: 100 },
              { label: "Delivered", value: 152, pct: 97 },
              { label: "Opened", value: 118, pct: 76 },
              { label: "Clicked", value: 43, pct: 28 },
            ].map((step) => (
              <div key={step.label} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 rounded-t bg-gradient-to-t from-primary/40 to-primary/70"
                  style={{ height: `${step.pct * 1.5}px` }}
                />
                <div className="text-center">
                  <p className="text-sm font-bold">{step.value}</p>
                  <p className="text-xs text-muted-foreground">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Emails */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent Emails</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Type</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Recipient</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Subject</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentEmails.map((email, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50 last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{email.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {email.recipient}
                    </td>
                    <td className="max-w-xs px-6 py-4">
                      <span className="truncate text-sm">{email.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          email.status === "Clicked"
                            ? "default"
                            : email.status === "Opened"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {email.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {email.time}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
