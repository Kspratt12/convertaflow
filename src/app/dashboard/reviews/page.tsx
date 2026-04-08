import { Star, CheckCircle2, Clock, Send } from "lucide-react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { canAccessFeature } from "@/lib/tier";
import { TierGate } from "@/components/dashboard/tier-gate";
import type { TierId } from "@/lib/types";

interface ReviewRow {
  id: string;
  customer_name: string;
  customer_email: string;
  status: "Sent" | "Opened" | "Completed";
  rating: number | null;
  sent_at: string;
  completed_at: string | null;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function loadReviews(businessId: string): Promise<ReviewRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("review_requests")
    .select("id, customer_name, customer_email, status, rating, sent_at, completed_at")
    .eq("business_id", businessId)
    .order("sent_at", { ascending: false })
    .limit(100);
  return (data ?? []) as ReviewRow[];
}

export default async function ReviewsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const tier = session.profile.plan_tier as TierId;
  if (!canAccessFeature(tier, "reviews") && session.profile.role !== "admin") {
    return (
      <TierGate
        requiredTier="growth"
        featureName="Review System"
        featureDescription="Send branded review requests to customers, track opens and completions, and turn happy clients into 5-star reviews. Included with Growth and above."
      />
    );
  }

  const reviews = await loadReviews(session.profile.id);
  const completed = reviews.filter((r) => r.status === "Completed");
  const completedRatings = completed.filter((r) => r.rating != null);
  const avgRating =
    completedRatings.length > 0
      ? completedRatings.reduce((sum, r) => sum + (r.rating ?? 0), 0) / completedRatings.length
      : 0;

  const counts = {
    total: reviews.length,
    sent: reviews.filter((r) => r.status === "Sent").length,
    completed: completed.length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Reviews</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Branded review requests, opens, and completions.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Sent" value={counts.total.toString()} icon={Send} />
        <SummaryCard label="Pending" value={counts.sent.toString()} icon={Clock} />
        <SummaryCard label="Completed" value={counts.completed.toString()} icon={CheckCircle2} />
        <SummaryCard
          label="Avg Rating"
          value={avgRating > 0 ? avgRating.toFixed(1) : "—"}
          icon={Star}
        />
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Recent Requests</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {reviews.length === 0 ? (
            <p className="py-8 text-center text-[12px] text-muted-foreground">
              No review requests yet. Once you start sending them, they&apos;ll show up here.
            </p>
          ) : (
            reviews.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between border-b border-border/30 py-3 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium">{r.customer_name}</p>
                  <p className="truncate text-[12px] text-muted-foreground">
                    {r.customer_email}
                  </p>
                </div>
                <div className="ml-3 flex shrink-0 items-center gap-3">
                  {r.rating != null && (
                    <span className="flex items-center gap-0.5 text-[12px] text-amber-600">
                      <Star className="h-3 w-3 fill-current" />
                      {r.rating}
                    </span>
                  )}
                  <Badge
                    variant={
                      r.status === "Completed"
                        ? "default"
                        : r.status === "Opened"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-[11px]"
                  >
                    {r.status}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {formatDate(r.sent_at)}
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

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Star;
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
