import { Mail, Send, Eye, CheckCircle2, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { canAccessFeature } from "@/lib/tier";
import { TierGate } from "@/components/dashboard/tier-gate";
import type { TierId } from "@/lib/types";

interface EmailRow {
  id: string;
  email_type: string;
  recipient_email: string;
  subject: string;
  status: string;
  created_at: string;
}

function formatRelative(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function statusVariant(status: string): "default" | "secondary" | "outline" | "destructive" {
  if (status === "Bounced") return "destructive";
  if (status === "Opened" || status === "Clicked") return "default";
  if (status === "Delivered") return "secondary";
  return "outline";
}

function typeLabel(type: string): string {
  const map: Record<string, string> = {
    lead_notification: "Lead Notification",
    review_request: "Review Request",
    follow_up: "Follow-up",
    confirmation: "Confirmation",
    welcome: "Welcome",
    onboarding_started: "Onboarding Started",
    onboarding_submitted: "Onboarding Submitted",
    project_started: "Project Started",
    milestone_25: "25% Milestone",
    milestone_50: "50% Milestone",
    milestone_75: "75% Milestone",
    revision_started: "Revision Started",
    completed: "Project Complete",
    delivery_sent: "Delivery Sent",
  };
  return map[type] ?? type;
}

async function loadEmails(businessId: string) {
  const supabase = await createClient();

  const [allEmailsRes, recentEmailsRes] = await Promise.all([
    supabase
      .from("email_events")
      .select("status")
      .eq("business_id", businessId),
    supabase
      .from("email_events")
      .select("id, email_type, recipient_email, subject, status, created_at")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const all = allEmailsRes.data ?? [];
  const counts = {
    total: all.length,
    delivered: all.filter((e) => ["Delivered", "Opened", "Clicked"].includes(e.status)).length,
    opened: all.filter((e) => ["Opened", "Clicked"].includes(e.status)).length,
    clicked: all.filter((e) => e.status === "Clicked").length,
  };

  return {
    counts,
    recent: (recentEmailsRes.data ?? []) as EmailRow[],
  };
}

export default async function EmailPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const tier = session.profile.plan_tier as TierId;
  if (!canAccessFeature(tier, "email")) {
    return (
      <TierGate
        requiredTier="growth"
        featureName="Email Activity"
        featureDescription="Track every email your site sends — lead notifications, review requests, follow-ups, and project updates. See deliverability, opens, and clicks. Included with Growth and above."
      />
    );
  }

  const { counts, recent } = await loadEmails(session.profile.id);

  const deliveryRate = counts.total > 0 ? ((counts.delivered / counts.total) * 100).toFixed(1) : "—";
  const openRate = counts.delivered > 0 ? ((counts.opened / counts.delivered) * 100).toFixed(1) : "—";
  const clickRate = counts.opened > 0 ? ((counts.clicked / counts.opened) * 100).toFixed(1) : "—";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Email Activity</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Every transactional and lifecycle email your account sends.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sent" value={counts.total.toString()} icon={Send} />
        <StatCard
          label="Delivered"
          value={counts.delivered.toString()}
          hint={deliveryRate !== "—" ? `${deliveryRate}%` : undefined}
          icon={CheckCircle2}
        />
        <StatCard
          label="Opened"
          value={counts.opened.toString()}
          hint={openRate !== "—" ? `${openRate}%` : undefined}
          icon={Eye}
        />
        <StatCard
          label="Clicked"
          value={counts.clicked.toString()}
          hint={clickRate !== "—" ? `${clickRate}%` : undefined}
          icon={Mail}
        />
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Recent Emails</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {recent.length === 0 ? (
            <p className="py-8 text-center text-[12px] text-muted-foreground">
              No emails sent yet. Activity will appear here as your account starts sending.
            </p>
          ) : (
            recent.map((e) => (
              <div
                key={e.id}
                className="flex items-start justify-between gap-3 border-b border-border/30 py-3 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium truncate">{e.subject}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {typeLabel(e.email_type)} · {e.recipient_email}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={statusVariant(e.status)} className="text-[11px]">
                    {e.status}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {formatRelative(e.created_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: typeof Mail;
}) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          {hint && <span className="text-[11px] font-semibold text-emerald-600">{hint}</span>}
        </div>
        <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-[12px] text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
