import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

/**
 * Stripe Customer Portal redirect.
 *
 * When STRIPE_SECRET_KEY is set and the user has a stripe_customer_id,
 * this should create a billing portal session and redirect to it.
 *
 * For now this is a scaffold — it returns a 503 explaining that billing
 * is not yet wired up. The portal UI handles this gracefully.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", "http://localhost").toString());
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const customerId = session.profile.stripe_customer_id;

  if (!stripeKey || !customerId) {
    // Graceful fallback — redirect back to billing with a message
    return NextResponse.json(
      {
        error: "Billing portal is not yet configured for your account.",
        configured: false,
      },
      { status: 503 }
    );
  }

  // TODO: Wire up Stripe SDK here once payments go live:
  //
  // const stripe = new Stripe(stripeKey);
  // const portalSession = await stripe.billingPortal.sessions.create({
  //   customer: customerId,
  //   return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/portal/billing`,
  // });
  // return NextResponse.redirect(portalSession.url);

  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
