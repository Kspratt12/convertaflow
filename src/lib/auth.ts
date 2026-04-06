import { createClient } from "@/lib/supabase/server";
import type { BusinessProfile } from "@/lib/types";

/**
 * Get the authenticated user and their business profile.
 * Returns null if not authenticated.
 */
export async function getSession() {
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

  return {
    user,
    profile: profile as BusinessProfile | null,
  };
}

/**
 * Get session or throw — use in layouts/pages that require auth.
 */
export async function requireSession() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
