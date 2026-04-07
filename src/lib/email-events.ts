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
  badge?: { label: string; tone: "purple" | "blue" | "amber" | "emerald" };
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

const PORTAL_URL = "https://www.convertaflow.co/portal";
const SITE_URL = "https://www.convertaflow.co";
const LOGO_URL = "https://www.convertaflow.co/convertaflow-c.png";
const SUPPORT_EMAIL = "support@convertaflow.co";

/* ---------- Theme tokens ---------- */
const BG_OUTER = "#06061a";
const BG_CARD = "#0e0e2a";
const BORDER = "#1f1f3a";
const TEXT_PRIMARY = "#ffffff";
const TEXT_SECONDARY = "rgba(255,255,255,0.65)";
const TEXT_MUTED = "rgba(255,255,255,0.40)";
const BRAND_PURPLE = "#7c3aed";
const BRAND_BLUE = "#3b82f6";
const BRAND_CYAN = "#06b6d4";
const PROGRESS_TRACK = "#1a1a35";

const TONE_STYLES: Record<
  "purple" | "blue" | "amber" | "emerald",
  { bg: string; border: string; text: string }
> = {
  purple: { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.35)", text: "#c4b5fd" },
  blue: { bg: "rgba(6,182,212,0.10)", border: "rgba(6,182,212,0.35)", text: "#67e8f9" },
  amber: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.35)", text: "#fcd34d" },
  emerald: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.35)", text: "#6ee7b7" },
};

/* ---------- HTML helpers ---------- */

function renderBadge(label: string, tone: "purple" | "blue" | "amber" | "emerald"): string {
  const t = TONE_STYLES[tone];
  return `<div style="display:inline-block;padding:6px 12px;border-radius:999px;background-color:${t.bg};border:1px solid ${t.border};color:${t.text};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;margin-bottom:18px;">${label}</div>`;
}

function renderProgressBar(percent: number, label: string): string {
  const safePercent = Math.max(0, Math.min(100, percent));
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0 4px;">
    <tr>
      <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:${TEXT_SECONDARY};padding-bottom:8px;">${label}</td>
      <td align="right" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:${TEXT_MUTED};padding-bottom:8px;">${safePercent}%</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${PROGRESS_TRACK}" style="background-color:${PROGRESS_TRACK};border-radius:999px;overflow:hidden;">
          <tr>
            <td height="6" width="${safePercent}%" bgcolor="${BRAND_PURPLE}" style="background-color:${BRAND_PURPLE};background-image:linear-gradient(90deg,${BRAND_PURPLE} 0%,${BRAND_BLUE} 100%);height:6px;line-height:6px;font-size:0;">&nbsp;</td>
            <td height="6" width="${100 - safePercent}%" bgcolor="${PROGRESS_TRACK}" style="background-color:${PROGRESS_TRACK};height:6px;line-height:6px;font-size:0;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

function renderCta(url: string, label: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 4px;">
    <tr>
      <td bgcolor="${BRAND_PURPLE}" style="border-radius:10px;background-color:${BRAND_PURPLE};background-image:linear-gradient(135deg,${BRAND_PURPLE} 0%,${BRAND_BLUE} 100%);">
        <a href="${url}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;letter-spacing:0.01em;">${label} →</a>
      </td>
    </tr>
  </table>`;
}

function renderNoteBlock(message: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0 4px;">
    <tr>
      <td style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:${TEXT_SECONDARY};">
        <div style="font-size:10px;font-weight:600;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Update from your team</div>
        ${message}
      </td>
    </tr>
  </table>`;
}

/* ---------- Email shell ---------- */

function emailShell(opts: TemplateOptions, vars: EventVars): string {
  const { preheader, badge, title, bodyHtml, progress, cta } = opts;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark light" />
<title>${title}</title>
<!--[if mso]>
<style type="text/css">
table { border-collapse: collapse; }
</style>
<![endif]-->
</head>
<body bgcolor="${BG_OUTER}" style="margin:0;padding:0;width:100%;background-color:${BG_OUTER};">

<!-- Preheader (hidden preview text) -->
<div style="display:none;font-size:1px;color:${BG_OUTER};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${BG_OUTER}" style="background-color:${BG_OUTER};">
  <tr>
    <td align="center" style="padding:32px 16px 48px;">

      <!-- 600px container -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">

        <!-- Brand header -->
        <tr>
          <td align="center" style="padding:0 0 28px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align:middle;padding-right:6px;">
                  <img src="${LOGO_URL}" width="32" height="32" alt="Convertaflow" style="display:block;border:0;outline:none;text-decoration:none;height:32px;width:32px;" />
                </td>
                <td style="vertical-align:middle;">
                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:${TEXT_PRIMARY};letter-spacing:-0.01em;">Convertaflow</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td bgcolor="${BG_CARD}" style="background-color:${BG_CARD};border:1px solid ${BORDER};border-radius:18px;overflow:hidden;">

            <!-- Top gradient bar -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td height="3" bgcolor="${BRAND_PURPLE}" style="height:3px;line-height:3px;font-size:0;background-color:${BRAND_PURPLE};background-image:linear-gradient(90deg,${BRAND_PURPLE} 0%,${BRAND_BLUE} 50%,${BRAND_CYAN} 100%);">&nbsp;</td>
              </tr>
            </table>

            <!-- Card body -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding:36px 36px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                  ${badge ? renderBadge(badge.label, badge.tone) : ""}

                  <h1 style="margin:0 0 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:26px;font-weight:800;color:${TEXT_PRIMARY};letter-spacing:-0.02em;line-height:1.25;">${title}</h1>

                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:${TEXT_SECONDARY};">
                    ${bodyHtml}
                  </div>

                  ${progress ? renderProgressBar(progress.percent, progress.label) : ""}

                  ${vars.message ? renderNoteBlock(vars.message) : ""}

                  ${cta ? renderCta(cta.url, cta.label) : ""}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:28px 24px 0;">
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${TEXT_MUTED};">
              Questions? Reply to this email or contact <a href="mailto:${SUPPORT_EMAIL}" style="color:${BRAND_CYAN};text-decoration:none;">${SUPPORT_EMAIL}</a>
            </div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.25);margin-top:14px;">
              <a href="${SITE_URL}" target="_blank" style="color:rgba(255,255,255,0.35);text-decoration:none;">Convertaflow</a> · Premium websites and growth systems
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}

/* ---------- Templates ---------- */

function p(html: string): string {
  return `<p style="margin:0 0 14px;">${html}</p>`;
}

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
  const html = emailShell(opts, vars);

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
