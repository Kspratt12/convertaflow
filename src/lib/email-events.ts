/**
 * Project lifecycle email events.
 *
 * One shared dispatcher. Each event type maps to a branded template
 * (premium dark Convertaflow look) and a project status it can be
 * triggered from. Sends via Resend (if configured) and logs into the
 * email_events table for audit/replay.
 *
 * Triggering pattern:
 *
 *   await sendProjectEvent({
 *     event: "project_started",
 *     businessId: "...",
 *     to: "client@example.com",
 *     vars: { businessName: "Acme", planName: "Foundation Build" },
 *   });
 *
 * If RESEND_API_KEY is missing, the event still logs to DB with
 * status='Queued' so it can be replayed later.
 */

import { sendEmail, isEmailConfigured } from "./email";
import { renderEmail, p, type BadgeTone, EMAIL_PORTAL_URL } from "./email-layout";
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

interface TemplateOptions {
  preheader: string;
  badge?: { label: string; tone: BadgeTone };
  title: string;
  bodyHtml: string;
  progress?: { percent: number; label: string };
  cta?: { url: string; label: string };
  /** Status this event is meaningful for — used by status-driven triggers */
  triggerStatus?: ProjectStatus;
}

interface EventTemplate {
  subject: (v: EventVars) => string;
  build: (v: EventVars) => TemplateOptions;
  triggerStatus?: ProjectStatus;
}

const PORTAL_URL = EMAIL_PORTAL_URL;

/* ---------- Templates ---------- */

export const PROJECT_EVENT_TEMPLATES: Record<ProjectEventType, EventTemplate> = {
  welcome: {
    subject: (v) => `Welcome to Convertaflow, ${v.contactName || v.businessName}`,
    build: (v) => ({
      preheader: `Your ${v.planName || "Convertaflow"} portal is ready. Next step: project onboarding.`,
      badge: { label: "Account Created", tone: "purple" },
      title: `Welcome, ${v.contactName || v.businessName}`,
      bodyHtml:
        p(`Your <strong style="color:#ffffff;">${v.planName || "Convertaflow"}</strong> account is set up and ready to go.`) +
        p(`The next step is your project onboarding. Answer a few questions about your business and our team will get to work on your build.`),
      cta: { url: `${PORTAL_URL}/onboarding`, label: "Start Onboarding" },
    }),
  },

  onboarding_started: {
    subject: (v) => `Your onboarding is in progress — ${v.businessName}`,
    build: (v) => ({
      preheader: `You started your onboarding. Save as you go — come back anytime to finish.`,
      badge: { label: "Onboarding · In Progress", tone: "blue" },
      title: `You've started your onboarding`,
      bodyHtml:
        p(`Just a heads up — your project onboarding is now underway.`) +
        p(`Take your time. You can save as you go and come back to finish whenever you're ready. We'll start the planning phase as soon as you submit.`),
      progress: { percent: 5, label: "Project status" },
      cta: { url: `${PORTAL_URL}/onboarding`, label: "Continue Onboarding" },
    }),
  },

  onboarding_submitted: {
    subject: (v) => `Got it — we're reviewing your onboarding`,
    build: (v) => ({
      preheader: `Thanks ${v.contactName || ""}. Our team is reviewing everything and will start planning your build.`,
      badge: { label: "Onboarding · Submitted", tone: "blue" },
      title: `We've got everything we need`,
      bodyHtml:
        p(`Thanks${v.contactName ? `, ${v.contactName}` : ""}. Your onboarding is in.`) +
        p(`Our team is reviewing your responses now and will kick off the planning phase within one business day. You'll get an update the moment we start your build.`),
      progress: { percent: 15, label: "Project status" },
      cta: { url: `${PORTAL_URL}/project`, label: "View Project Status" },
    }),
    triggerStatus: "onboarding_submitted",
  },

  project_started: {
    subject: (v) => `Your project is officially underway`,
    build: (v) => ({
      preheader: `We've kicked off your ${v.planName || "build"}. Track progress anytime in your portal.`,
      badge: { label: "Project · In Progress", tone: "purple" },
      title: `Your build is underway`,
      bodyHtml:
        p(`Great news — we've officially kicked off your <strong style="color:#ffffff;">${v.planName || "project"}</strong>.`) +
        p(`Our team is now in active build mode. You can check progress, leave notes, and upload assets anytime in your portal. We'll send you milestone updates as we go.`),
      progress: { percent: 35, label: "Project status" },
      cta: { url: `${PORTAL_URL}/project`, label: "View Progress" },
    }),
    triggerStatus: "in_progress",
  },

  milestone_25: {
    subject: (v) => `25% complete — ${v.businessName}`,
    build: () => ({
      preheader: `Quick update — your build is 25% complete. Foundations are taking shape.`,
      badge: { label: "Milestone · 25%", tone: "purple" },
      title: `We're 25% in`,
      bodyHtml:
        p(`Quick update — your build is now <strong style="color:#ffffff;">25% complete</strong>.`) +
        p(`Foundations are in place and the structure is taking shape. We'll have more to show you soon.`),
      progress: { percent: 25, label: "Build progress" },
      cta: { url: `${PORTAL_URL}/project`, label: "View Progress" },
    }),
    triggerStatus: "milestone_25",
  },

  milestone_50: {
    subject: (v) => `Halfway there — ${v.businessName}`,
    build: () => ({
      preheader: `50% complete. Your build is taking real shape now.`,
      badge: { label: "Milestone · 50%", tone: "purple" },
      title: `Halfway through`,
      bodyHtml:
        p(`We're at the midpoint — your build is now <strong style="color:#ffffff;">50% complete</strong>.`) +
        p(`Things are moving fast. Your project is taking real shape. Stay tuned for the next update.`),
      progress: { percent: 50, label: "Build progress" },
      cta: { url: `${PORTAL_URL}/project`, label: "View Progress" },
    }),
    triggerStatus: "milestone_50",
  },

  milestone_75: {
    subject: (v) => `Final stretch — ${v.businessName}`,
    build: () => ({
      preheader: `75% complete. Final review and revisions are next.`,
      badge: { label: "Milestone · 75%", tone: "purple" },
      title: `Final stretch`,
      bodyHtml:
        p(`We're <strong style="color:#ffffff;">75% through</strong>.`) +
        p(`Almost there — final review and revision rounds are coming up next. We'll be in touch soon to walk you through what we've built.`),
      progress: { percent: 75, label: "Build progress" },
      cta: { url: `${PORTAL_URL}/project`, label: "View Progress" },
    }),
    triggerStatus: "milestone_75",
  },

  revision_started: {
    subject: (v) => `Time for revisions — ${v.businessName}`,
    build: () => ({
      preheader: `Take a look at your build and let us know what you'd like changed.`,
      badge: { label: "Revisions · Open", tone: "amber" },
      title: `Revision round is open`,
      bodyHtml:
        p(`Your build is ready for your review.`) +
        p(`Take a look and submit any revision requests directly through your portal — we'll knock them out fast. Be as specific as you can; the more detail, the quicker we can deliver.`),
      progress: { percent: 85, label: "Project status" },
      cta: { url: `${PORTAL_URL}/revisions`, label: "Request Changes" },
    }),
    triggerStatus: "revision_round",
  },

  completed: {
    subject: (v) => `Your project is complete — ${v.businessName}`,
    build: (v) => ({
      preheader: `It's a wrap. Your portal stays open for changes, uploads, and support.`,
      badge: { label: "Project · Complete", tone: "emerald" },
      title: `It's a wrap`,
      bodyHtml:
        p(`Your <strong style="color:#ffffff;">${v.planName || "project"}</strong> is officially complete.`) +
        p(`Your portal stays open for the long haul. Request future changes, upload new assets, and access all your delivery links anytime.`),
      progress: { percent: 100, label: "Project complete" },
      cta: { url: PORTAL_URL, label: "Open Your Portal" },
    }),
    triggerStatus: "completed",
  },

  delivery_sent: {
    subject: (v) => `Your project is ready — ${v.businessName}`,
    build: (v) => ({
      preheader: `Everything's ready. Preview, live site, and dashboard access are inside.`,
      badge: { label: "Delivery · Ready", tone: "emerald" },
      title: `Your delivery is ready`,
      bodyHtml:
        p(`Everything's in place for <strong style="color:#ffffff;">${v.businessName}</strong>.`) +
        p(`Your delivery links are now available in your portal — preview, live site, and any dashboard access included.`),
      progress: { percent: 100, label: "Project status" },
      cta: { url: v.ctaUrl || `${PORTAL_URL}/delivery`, label: v.ctaLabel || "View Delivery" },
    }),
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
  const opts = tpl.build(vars);
  const html = renderEmail({ ...opts, note: vars.message });

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
