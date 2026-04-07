import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import {
  sendEmail,
  isEmailConfigured,
} from "@/lib/email";
import { renderEmail, p } from "@/lib/email-layout";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

/**
 * POST /api/revisions
 *
 * Customer-facing endpoint for submitting change requests (post-launch
 * content edits, fixes, holiday hours, specials, etc). Stored in
 * public.revision_requests, then a notification email goes to the
 * NOTIFICATION_EMAIL inbox so the team knows to act on it.
 *
 * The same table is reused for during-build revision rounds — only
 * difference is the customer's project_status. Both flow through here.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, pageOrSection, priority } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required." },
        { status: 400 }
      );
    }

    const cleanPriority =
      priority === "low" || priority === "high" ? priority : "normal";

    const supabase = await createClient();
    const { data: row, error } = await supabase
      .from("revision_requests")
      .insert({
        business_id: session.profile.id,
        title: title.trim(),
        description: description.trim(),
        page_or_section: pageOrSection?.trim() || null,
        priority: cleanPriority,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Revision insert failed:", error);
      return NextResponse.json(
        { error: "Couldn't save your request. Please try again." },
        { status: 500 }
      );
    }

    // Notify the team — never block the response on email failure
    if (isEmailConfigured() && process.env.NOTIFICATION_EMAIL) {
      try {
        const tier = TIERS[session.profile.plan_tier as TierId];
        const priorityLabel =
          cleanPriority === "high"
            ? "🔴 High"
            : cleanPriority === "low"
            ? "🔵 Low"
            : "⚪ Normal";

        const detailsHtml = `
          <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Customer:</strong> ${session.profile.business_name}</p>
          <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Plan:</strong> ${tier?.name ?? session.profile.plan_tier}</p>
          <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Priority:</strong> ${priorityLabel}</p>
          ${pageOrSection ? `<p style="margin:0 0 8px;"><strong style="color:#ffffff;">Page / Section:</strong> ${pageOrSection}</p>` : ""}
          <p style="margin:12px 0 0;"><strong style="color:#ffffff;">Request:</strong></p>
          <p style="margin:4px 0 0;white-space:pre-wrap;">${description}</p>
        `;

        await sendEmail({
          to: process.env.NOTIFICATION_EMAIL,
          subject: `📝 Change request from ${session.profile.business_name}: ${title}`,
          html: renderEmail({
            preheader: `${session.profile.business_name} just submitted a change request.`,
            badge: { label: "Action Required", tone: "amber" },
            title: title,
            bodyHtml: p(
              `<strong style="color:#ffffff;">${session.profile.business_name}</strong> just submitted a change request through their portal. Details below.`
            ),
            note: detailsHtml,
            cta: {
              url: `https://www.convertaflow.co/admin/projects/${session.profile.id}`,
              label: "Open in Admin",
            },
          }),
        });
      } catch (emailErr) {
        console.error("Revision notification email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, request: row });
  } catch (err) {
    console.error("Revision route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revisions — list the current customer's past change requests.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("revision_requests")
    .select("id, title, description, page_or_section, priority, status, created_at")
    .eq("business_id", session.profile.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ requests: data ?? [] });
}
