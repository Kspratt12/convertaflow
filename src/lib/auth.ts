import { createClient } from "@/lib/supabase/server";
import type { BusinessProfile, DashboardSession } from "@/lib/types";

/**
 * Get the authenticated user and their business profile.
 * Returns null if not authenticated.
 */
export async function getSession(): Promise<DashboardSession | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("business_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) return null;

  return {
    user: {
      id: user.id,
      email: user.email ?? "",
    },
    profile: profile as BusinessProfile,
  };
}

/**
 * Get session or redirect — use in server components/layouts that require auth.
 */
export async function requireSession(): Promise<DashboardSession> {
  const session = await getSession();
  if (!session) {
    // This will be caught by error boundary or middleware redirect
    throw new Error("Unauthorized");
  }
  return session;
}

/**
 * Check if user is a platform admin.
 */
export function isAdmin(session: DashboardSession): boolean {
  return session.profile.role === "admin";
}

/**
 * Check if the business plan is in good standing.
 */
export function isPlanActive(session: DashboardSession): boolean {
  return session.profile.plan_status === "active" || session.profile.plan_status === "trial";
}
