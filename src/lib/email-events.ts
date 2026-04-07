/**
 * Project lifecycle email events.
 *
 * One shared dispatcher. Each event type maps to a template + a project
 * status it can be triggered from. Sends via Resend (if configured) and
 * logs into the email_events table for audit/replay.
 *
 * Triggering pattern:
 *
 *   await sendProjectEvent({
 *     event: "project_started",
 *     businessId: "...",
 *     to: "client@example.com",
 *     vars: { businessName: "Acme", projectName: "Foundation Build" },
 *   });
 *
 * If RESEND_API_KEY is missing, the event still logs to DB with
 * status='Queued' so it can be replayed later.
 */

import { sendEmail, isEmailConfigured } from "./email";
import { createClient } from "./supabase/server";
import type { ProjectStatus } from "./project-status";

export type ProjectEventType =
  | "welcome"
  | "onboarding_started"
  | "onboarding_submitted"
  | "project_started"
  | "milestone_25"
  | "milestone_50"
  | "milestone_75"
  | "revision_started"
  | "completed"
  | "delivery_sent";

export interface EventVars {
  businessName: string;
  contactName?: string;
  /** Plan name (e.g. "Website + Growth System") */
  planName?: string;
  /** Optional CTA URL — e.g. delivery link, portal link */
  ctaUrl?: string;
  /** Optional CTA label */
  ctaLabel?: string;
  /** Optional message body for revision/completion notes */
  message?: string;
}

interface EventTemplate {
  subject: (v: EventVars) => string;
  body: (v: EventVars) => string;
  /** Status this event is meaningful for — used by status-driven triggers */
  triggerStatus?: ProjectStatus;
}

const PORTAL_URL = "https://www.convertaflow.co/portal";

function shell(title: string, bodyHtml: string, vars: EventVars): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #f8fafc;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 32px; border-radius: 12px; color: white; margin-bottom: 24px;">
        <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 700;">${title}</h1>
        ${vars.businessName ? `<p style="margin: 0; opacity: 0.9; font-size: 14px;">${vars.businessName}</p>` : ""}
      </div>
      <div style="background: white; padding: 28px; border-radius: 12px; border: 1px solid #e2e8f0;">
        ${bodyHtml}
        ${
          vars.ctaUrl
            ? `<div style="text-align: center; margin: 28px 0 8px;">
                 <a href="${vars.ctaUrl}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">${vars.ctaLabel || "Open Portal"}</a>
               </div>`
            : ""
        }
      </div>
      <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; text-align: center;">— The Convertaflow team</p>
    </div>
  `;
}

export const PROJECT_EVENT_TEMPLATES: Record<ProjectEventType, EventTemplate> = {
  welcome: {
    subject: (v) => `Welcome to Convertaflow, ${v.contactName || v.businessName}`,
    body: (v) =>
      shell(
        "Your portal is ready",
        `<p style="margin: 0 0 12px; color: #475569; font-size: 15px; line-height: 1.6;">
           Hi ${v.contactName || "there"}, your <strong>${v.planName || "Convertaflow"}</strong> account is set up. The next step is your project onboarding — answer a few questions about your business and we'll start your build.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || PORTAL_URL, ctaLabel: v.ctaLabel || "Start Onboarding" }
      ),
  },
  onboarding_started: {
    subject: (v) => `${v.businessName} — your onboarding is in progress`,
    body: (v) =>
      shell(
        "Onboarding in progress",
        `<p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
           Just a heads up — you've started your onboarding. Save as you go, you can come back and finish anytime.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || `${PORTAL_URL}/onboarding`, ctaLabel: "Continue Onboarding" }
      ),
  },
  onboarding_submitted: {
    subject: (v) => `We've got everything we need — ${v.businessName}`,
    body: (v) =>
      shell(
        "Onboarding submitted",
        `<p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
           Thanks ${v.contactName || ""}. Our team is reviewing your onboarding now and will start planning your build within one business day. You'll get an update as soon as we kick things off.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || PORTAL_URL, ctaLabel: "View Project Status" }
      ),
    triggerStatus: "onboarding_submitted",
  },
  project_started: {
    subject: (v) => `Your project is officially underway`,
    body: (v) =>
      shell(
        "Build started",
        `<p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
           Great news — we've kicked off your <strong>${v.planName || "project"}</strong> build. You can check progress, leave notes, and upload assets anytime in your portal.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || `${PORTAL_URL}/project`, ctaLabel: "View Progress" }
      ),
    triggerStatus: "in_progress",
  },
  milestone_25: {
    subject: (v) => `25% milestone — ${v.businessName}`,
    body: (v) =>
      shell(
        "We're 25% in",
        `<p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
           Quick update — your build is now 25% complete. Foundations are taking shape. We'll have more to show you soon.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || `${PORTAL_URL}/project`, ctaLabel: "View Progress" }
      ),
    triggerStatus: "milestone_25",
  },
  milestone_50: {
    subject: (v) => `Halfway there — ${v.businessName}`,
    body: (v) =>
      shell(
        "50% complete",
        `<p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
           We're at the midpoint. Things are moving fast — your build is taking real shape now. Stay tuned for the next update.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || `${PORTAL_URL}/project`, ctaLabel: "View Progress" }
      ),
    triggerStatus: "milestone_50",
  },
  milestone_75: {
    subject: (v) => `Final stretch — ${v.businessName}`,
    body: (v) =>
      shell(
        "75% complete",
        `<p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
           We're 75% through. Almost there — final review and revision rounds are coming up next.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || `${PORTAL_URL}/project`, ctaLabel: "View Progress" }
      ),
    triggerStatus: "milestone_75",
  },
  revision_started: {
    subject: (v) => `Time for revisions — ${v.businessName}`,
    body: (v) =>
      shell(
        "Revision round opened",
        `<p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6;">
           Take a look at the build and let us know what you'd like changed. Submit revision requests directly in your portal — we'll knock them out fast.
         </p>`,
        { ...v, ctaUrl: v.ctaUrl || `${PORTAL_URL}/revisions`, ctaLabel: "Request Changes" }
      ),
    triggerStatus: "revision_round",
  },
  completed: {
    subject: (v) => `Project complete — ${v.businessName}`,
    body: (v) =>
      shell(
        "It's a wrap",
        `<p style="margin: 0 0 12px; color: #475569; font-size: 15px; line-height: 1.6;">
           Your project is officially complete. Your portal stays open — request future changes, upload new assets, and access all your delivery links anytime.
         </p>
         ${v.message ? `<p style="margin: 12px 0 0; color: #475569; font-size: 14px; line-height: 1.6; padding: 12px; background: #f1f5f9; border-radius: 8px;">${v.message}</p>` : ""}`,
        { ...v, ctaUrl: v.ctaUrl || PORTAL_URL, ctaLabel: "Open Portal" }
      ),
    triggerStatus: "completed",
  },
  delivery_sent: {
    subject: (v) => `Your project is ready — ${v.businessName}`,
    body: (v) =>
      shell(
        "Delivery is here",
        `<p style="margin: 0 0 12px; color: #475569; font-size: 15px; line-height: 1.6;">
           Everything's ready for you. Your delivery links are now available in your portal — preview, live site, and dashboard access included.
         </p>
         ${v.message ? `<p style="margin: 12px 0 0; color: #475569; font-size: 14px; line-height: 1.6; padding: 12px; background: #f1f5f9; border-radius: 8px;">${v.message}</p>` : ""}`,
        { ...v, ctaUrl: v.ctaUrl || `${PORTAL_URL}/delivery`, ctaLabel: "View Delivery" }
      ),
    triggerStatus: "delivered",
  },
};

interface SendProjectEventInput {
  event: ProjectEventType;
  businessId: string;
  to: string;
  vars: EventVars;
}

/**
 * Send a project event email and log it to email_events.
 *
 * If Resend is not configured, the event still logs with status='Queued'
 * so it can be replayed later.
 */
export async function sendProjectEvent({
  event,
  businessId,
  to,
  vars,
}: SendProjectEventInput): Promise<{ ok: boolean; queued?: boolean; error?: string }> {
  const tpl = PROJECT_EVENT_TEMPLATES[event];
  if (!tpl) {
    return { ok: false, error: `Unknown event: ${event}` };
  }

  const subject = tpl.subject(vars);
  const html = tpl.body(vars);

  const supabase = await createClient();

  // Always log first (queued) so we never lose an event
  const { data: logRow } = await supabase
    .from("email_events")
    .insert({
      business_id: businessId,
      email_type: event,
      recipient_email: to,
      subject,
      status: "Queued",
    })
    .select()
    .single();

  if (!isEmailConfigured()) {
    return { ok: true, queued: true };
  }

  try {
    await sendEmail({ to, subject, html });
    if (logRow) {
      await supabase
        .from("email_events")
        .update({ status: "Sent" })
        .eq("id", logRow.id);
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "send failed";
    if (logRow) {
      await supabase
        .from("email_events")
        .update({ status: "Bounced" })
        .eq("id", logRow.id);
    }
    return { ok: false, error: msg };
  }
}

/**
 * Map a project status change → which event to fire automatically.
 * Used by /api/project/status when admin advances the project.
 */
export function eventForStatus(status: ProjectStatus): ProjectEventType | null {
  for (const [event, tpl] of Object.entries(PROJECT_EVENT_TEMPLATES)) {
    if (tpl.triggerStatus === status) {
      return event as ProjectEventType;
    }
  }
  return null;
}
