import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth-style callback for Supabase auth flows.
 *
 * Used by:
 *  - Password recovery: Supabase emails a link with ?code=...
 *    pointing here. We exchange the code for a session, then redirect
 *    to /reset-password where the user sets a new password.
 *  - Magic link sign-in (future)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/portal";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("Auth callback exchange failed:", error.message);
  }

  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}
