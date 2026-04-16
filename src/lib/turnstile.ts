/**
 * Server-side Cloudflare Turnstile token verification.
 *
 * Env vars:
 *   TURNSTILE_SECRET_KEY — your Turnstile secret key
 *
 * In development you can use the Cloudflare "always passes" test keys:
 *   Site key:   1x00000000000000000000AA
 *   Secret key: 1x0000000000000000000000000000000AA
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If Turnstile isn't configured, allow the request through so dev
    // environments aren't blocked. In production, set the env var.
    console.warn("TURNSTILE_SECRET_KEY not set — skipping spam check");
    return true;
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}
