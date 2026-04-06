import { createClient } from "@/lib/supabase/server";
import type { Lead, ReviewRequest, EmailEvent, SocialLink, ActivityLog } from "@/lib/types";

/**
 * Scoped data helpers — all queries filter by business_id automatically.
 * Use these from server components or API routes.
 */

export async function getLeads(businessId: string, limit = 100) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Lead[];
}

export async function getLeadStats(businessId: string) {
  const leads = await getLeads(businessId);
  return {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    converted: leads.filter((l) => l.status === "Converted").length,
  };
}

export async function getReviewRequests(businessId: string, limit = 100) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("review_requests")
    .select("*")
    .eq("business_id", businessId)
    .order("sent_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as ReviewRequest[];
}

export async function getReviewStats(businessId: string) {
  const reviews = await getReviewRequests(businessId);
  const completed = reviews.filter((r) => r.status === "Completed");
  const avgRating = completed.length
    ? completed.reduce((sum, r) => sum + (r.rating ?? 0), 0) / completed.length
    : 0;

  return {
    total: reviews.length,
    completed: completed.length,
    avgRating: Math.round(avgRating * 10) / 10,
    completionRate: reviews.length
      ? Math.round((completed.length / reviews.length) * 100)
      : 0,
  };
}

export async function getEmailEvents(businessId: string, limit = 100) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("email_events")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as EmailEvent[];
}

export async function getEmailStats(businessId: string) {
  const emails = await getEmailEvents(businessId);
  return {
    sent: emails.length,
    delivered: emails.filter((e) => e.status !== "Bounced").length,
    opened: emails.filter((e) => e.status === "Opened" || e.status === "Clicked").length,
    clicked: emails.filter((e) => e.status === "Clicked").length,
  };
}

export async function getSocialLinks(businessId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as SocialLink[];
}

export async function getActivity(businessId: string, limit = 50) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as ActivityLog[];
}

/** Log a business activity event */
export async function logActivity(
  businessId: string,
  action: string,
  target: string | null,
  type: ActivityLog["type"]
) {
  const supabase = await createClient();
  await supabase.from("activity_logs").insert({
    business_id: businessId,
    action,
    target,
    type,
  });
}
