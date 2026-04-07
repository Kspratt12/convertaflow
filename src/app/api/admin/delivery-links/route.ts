import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import { sendProjectEvent } from "@/lib/email-events";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

const VALID_TYPES = ["preview", "live", "dashboard", "other"] as const;

async function requireAdmin() {
  const session = await getSession();
  if (!session) return { error: "Unauthorized", code: 401, session: null };
  if (session.profile.role !== "admin") return { error: "Forbidden", code: 403, session: null };
  return { error: null, code: 0, session };
}

/**
 * GET — list all delivery links, optionally scoped to a businessId.
 */
export async function GET(request: NextRequest) {
  const { error, code, session } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: code });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get("businessId");

  const supabase = await createClient();
  let query = supabase
    .from("delivery_links")
    .select("*")
    .order("created_at", { ascending: false });

  if (businessId) query = query.eq("business_id", businessId);

  const { data, error: dbError } = await query;
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ links: data || [] });
}

/**
 * POST — create a delivery link for a business.
 * Body: { businessId, label, url, link_type, notes?, notify? }
 *
 * If notify=true, fires the delivery_sent email event automatically.
 */
export async function POST(request: NextRequest) {
  const { error, code } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: code });

  try {
    const { businessId, label, url, link_type, notes, notify } = await request.json();

    if (!businessId || !label || !url) {
      return NextResponse.json(
        { error: "businessId, label, and url are required" },
        { status: 400 }
      );
    }

    const type = VALID_TYPES.includes(link_type) ? link_type : "other";

    const supabase = await createClient();
    const { data: row, error: dbError } = await supabase
      .from("delivery_links")
      .insert({
        business_id: businessId,
        label,
        url,
        link_type: type,
        notes: notes || null,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // Optionally fire the delivery_sent email
    let emailResult = null;
    if (notify) {
      const { data: profile } = await supabase
        .from("business_profiles")
        .select("business_email, business_name, plan_tier")
        .eq("id", businessId)
        .single();

      if (profile?.business_email) {
        const tier = TIERS[profile.plan_tier as TierId];
        emailResult = await sendProjectEvent({
          event: "delivery_sent",
          businessId,
          to: profile.business_email,
          vars: {
            businessName: profile.business_name,
            planName: tier?.name,
            ctaUrl: url,
            ctaLabel: "Open Delivery",
            message: notes || undefined,
          },
        });
      }
    }

    return NextResponse.json({ success: true, link: row, email: emailResult });
  } catch (err) {
    console.error("Delivery link create error:", err);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

/**
 * DELETE — remove a delivery link by id.
 */
export async function DELETE(request: NextRequest) {
  const { error, code } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status: code });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error: dbError } = await supabase.from("delivery_links").delete().eq("id", id);
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
