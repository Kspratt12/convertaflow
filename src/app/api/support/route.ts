import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import { sendEmail, isEmailConfigured } from "@/lib/email";
import { renderEmail, p } from "@/lib/email-layout";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

/**
 * POST /api/support
 *
 * Customer-facing endpoint for the portal Support page. Writes to
 * public.support_requests and emails NOTIFICATION_EMAIL so the team
 * is told immediately when a customer needs help.
 *
 * Same pattern as /api/revisions: real DB write, branded admin
 * notification, never blocks the response on email failure.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { subject, message, category } = body;

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required." },
        { status: 400 }
      );
    }

    const cleanCategory =
      category === "issue" ||
      category === "request" ||
      category === "feedback"
        ? category
        : "question";

    const supabase = await createClient();
    const { data: row, error } = await supabase
      .from("support_requests")
      .insert({
        business_id: session.profile.id,
        subject: subject.trim(),
        message: message.trim(),
        category: cleanCategory,
        status: "open",
      })
      .select()
      .single();

    if (error) {
      console.error("Support insert failed:", error);
      return NextResponse.json(
        { error: "Couldn't save your request. Please try again." },
        { status: 500 }
      );
    }

    // Notify the team — never block the response on email failure.
    if (isEmailConfigured() && process.env.NOTIFICATION_EMAIL) {
      try {
        const tier = TIERS[session.profile.plan_tier as TierId];
        const categoryLabel =
          cleanCategory === "issue"
            ? "🔴 Issue"
            : cleanCategory === "request"
            ? "💡 Request"
            : cleanCategory === "feedback"
            ? "💬 Feedback"
            : "❓ Question";

        const detailsHtml = `
          <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Customer:</strong> ${session.profile.business_name}</p>
          <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Plan:</strong> ${tier?.name ?? session.profile.plan_tier}</p>
          <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Category:</strong> ${categoryLabel}</p>
          <p style="margin:12px 0 0;"><strong style="color:#ffffff;">Message:</strong></p>
          <p style="margin:4px 0 0;white-space:pre-wrap;">${message}</p>
        `;

        await sendEmail({
          to: process.env.NOTIFICATION_EMAIL,
          subject: `🆘 Support: ${session.profile.business_name} — ${subject}`,
          html: renderEmail({
            preheader: `${session.profile.business_name} just submitted a support request.`,
            badge: { label: "Support Ticket", tone: "blue" },
            title: subject,
            bodyHtml: p(
              `<strong style="color:#ffffff;">${session.profile.business_name}</strong> needs help with their ${tier?.name ?? "Convertaflow"} account.`
            ),
            note: detailsHtml,
            cta: {
              url: `https://www.convertaflow.co/admin/projects/${session.profile.id}`,
              label: "Open Customer in Admin",
            },
          }),
        });
      } catch (emailErr) {
        console.error("Support notification email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, request: row });
  } catch (err) {
    console.error("Support route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/support — list the current customer's past support requests.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("support_requests")
    .select("id, subject, message, category, status, created_at")
    .eq("business_id", session.profile.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ requests: data ?? [] });
}
