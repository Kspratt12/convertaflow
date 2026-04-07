import { Resend } from "resend";
import { renderEmail, p, EMAIL_SITE_URL, EMAIL_SUPPORT, EMAIL_BRAND } from "./email-layout";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    _resend = new Resend(key);
  }
  return _resend;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM || `${EMAIL_BRAND} <${EMAIL_SUPPORT}>`,
}: SendEmailParams) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: process.env.EMAIL_REPLY_TO || EMAIL_SUPPORT,
  });

  if (error) {
    console.error("Email send failed:", error);
    throw new Error(error.message);
  }

  return data;
}

export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

// ──────────────────────────────────────────────────────────────────────────
// Marketing / transactional templates (all use the shared branded shell)
// ──────────────────────────────────────────────────────────────────────────

export function newLeadEmail(leadName: string, leadEmail: string, message?: string) {
  return {
    subject: `New lead: ${leadName}`,
    html: renderEmail({
      preheader: `New lead from ${leadName} — ${leadEmail}`,
      badge: { label: "New Lead", tone: "purple" },
      title: "New lead received",
      bodyHtml:
        p(`Someone just reached out through your <strong style="color:#ffffff;">${EMAIL_BRAND}</strong> site.`) +
        p(
          `<strong style="color:#ffffff;">${leadName}</strong><br>` +
            `<a href="mailto:${leadEmail}" style="color:#67e8f9;text-decoration:none;">${leadEmail}</a>`
        ),
      note: message,
      cta: { url: `mailto:${leadEmail}`, label: "Reply to Lead" },
    }),
  };
}

export function reviewRequestEmail(businessName: string, customerName: string, reviewLink: string) {
  return {
    subject: `${businessName} would love your feedback`,
    html: renderEmail({
      preheader: `${businessName} is asking for a quick review.`,
      badge: { label: "Feedback Request", tone: "blue" },
      title: `How was your experience, ${customerName}?`,
      bodyHtml:
        p(`<strong style="color:#ffffff;">${businessName}</strong> would love to hear your feedback.`) +
        p(`It only takes a minute and genuinely helps us serve you better.`),
      cta: { url: reviewLink, label: "Leave a Review" },
    }),
  };
}

export function contactConfirmationEmail(name: string) {
  return {
    subject: `We received your message — ${EMAIL_BRAND}`,
    html: renderEmail({
      preheader: "Thanks for reaching out — we'll be in touch within one business day.",
      badge: { label: "Message Received", tone: "emerald" },
      title: `Thanks for reaching out, ${name}`,
      bodyHtml:
        p(`We received your message and will get back to you within one business day.`) +
        p(`In the meantime, feel free to explore our features and pricing — and if anything is urgent, just reply to this email. It goes straight to our team.`),
      cta: { url: `${EMAIL_SITE_URL}/pricing`, label: "Explore Pricing" },
    }),
  };
}

// ──────────────────────────────────────────────────────────────────────────
// Admin notifications — internal emails to the Convertaflow team
// ──────────────────────────────────────────────────────────────────────────

interface AdminSignupVars {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  planName: string;
}

export function adminNewSignupEmail(v: AdminSignupVars) {
  const detailsHtml = `
    <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Business:</strong> ${v.businessName}</p>
    <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Contact:</strong> ${v.contactName}</p>
    <p style="margin:0 0 8px;"><strong style="color:#ffffff;">Email:</strong> <a href="mailto:${v.email}" style="color:#67e8f9;text-decoration:none;">${v.email}</a></p>
    ${v.phone ? `<p style="margin:0 0 8px;"><strong style="color:#ffffff;">Phone:</strong> ${v.phone}</p>` : ""}
    <p style="margin:0;"><strong style="color:#ffffff;">Plan:</strong> ${v.planName}</p>
  `;
  return {
    subject: `🎉 New signup: ${v.businessName} (${v.planName})`,
    html: renderEmail({
      preheader: `${v.contactName} just signed up for ${v.planName}.`,
      badge: { label: "New Signup", tone: "purple" },
      title: "New customer signed up",
      bodyHtml:
        p(`A new customer just created their ${EMAIL_BRAND} account. They'll be working through onboarding next.`),
      note: detailsHtml,
      cta: { url: `${EMAIL_SITE_URL}/admin/customers`, label: "View in Admin" },
    }),
  };
}

interface AdminOnboardingVars {
  businessName: string;
  email: string;
  planName: string;
  businessId: string;
  /** Optional Tier 3 custom build details — surfaced prominently if present */
  customBuild?: {
    overview?: string | null;
    problem?: string | null;
    inspiration?: string | null;
    priority?: string | null;
    timeline?: string | null;
    phoneFeatures?: string[] | null;
  };
  /** Optional Tier 2 extras request — surfaced if present */
  extras?: {
    requested?: string[] | null;
    notes?: string | null;
  };
}

export function adminOnboardingSubmittedEmail(v: AdminOnboardingVars) {
  // Build the custom-build callout block if Tier 3 fields are present.
  const hasCustomBuild =
    v.customBuild &&
    (v.customBuild.overview ||
      v.customBuild.problem ||
      (v.customBuild.phoneFeatures && v.customBuild.phoneFeatures.length > 0));

  const customBuildHtml = hasCustomBuild
    ? `
      <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#fcd34d;">Custom Build Request</p>
      ${v.customBuild?.overview ? `<p style="margin:0 0 10px;color:#ffffff;font-size:14px;line-height:1.55;"><strong>What they want built:</strong><br>${v.customBuild.overview}</p>` : ""}
      ${v.customBuild?.problem ? `<p style="margin:0 0 10px;color:rgba(255,255,255,0.75);font-size:13px;line-height:1.55;"><strong style="color:#ffffff;">Problem to solve:</strong><br>${v.customBuild.problem}</p>` : ""}
      ${v.customBuild?.inspiration ? `<p style="margin:0 0 10px;color:rgba(255,255,255,0.75);font-size:13px;line-height:1.55;"><strong style="color:#ffffff;">Inspiration / examples:</strong><br>${v.customBuild.inspiration}</p>` : ""}
      ${v.customBuild?.priority ? `<p style="margin:0 0 6px;color:rgba(255,255,255,0.75);font-size:13px;"><strong style="color:#ffffff;">Priority:</strong> ${v.customBuild.priority}</p>` : ""}
      ${v.customBuild?.timeline ? `<p style="margin:0 0 10px;color:rgba(255,255,255,0.75);font-size:13px;"><strong style="color:#ffffff;">Timeline:</strong> ${v.customBuild.timeline}</p>` : ""}
      ${
        v.customBuild?.phoneFeatures && v.customBuild.phoneFeatures.length > 0
          ? `<p style="margin:0 0 6px;color:#ffffff;font-size:13px;font-weight:600;">Phone features requested ($29/mo each):</p><ul style="margin:0 0 0 18px;padding:0;color:rgba(255,255,255,0.75);font-size:13px;">${v.customBuild.phoneFeatures.map((f) => `<li style="margin-bottom:4px;">${f}</li>`).join("")}</ul>`
          : ""
      }
    `
    : "";

  // Build the extras callout if Tier 2 selected anything.
  const hasExtras =
    v.extras &&
    ((v.extras.requested && v.extras.requested.length > 0) || v.extras.notes);

  const extrasHtml = hasExtras
    ? `
      <p style="margin:${hasCustomBuild ? "16px" : "0"} 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#67e8f9;">Extras Requested</p>
      ${
        v.extras?.requested && v.extras.requested.length > 0
          ? `<ul style="margin:0 0 8px 18px;padding:0;color:rgba(255,255,255,0.75);font-size:13px;">${v.extras.requested.map((e) => `<li style="margin-bottom:4px;">${e}</li>`).join("")}</ul>`
          : ""
      }
      ${v.extras?.notes ? `<p style="margin:0;color:rgba(255,255,255,0.75);font-size:13px;line-height:1.55;"><strong style="color:#ffffff;">Notes:</strong> ${v.extras.notes}</p>` : ""}
    `
    : "";

  const noteContent = customBuildHtml + extrasHtml;

  return {
    subject: `📋 Onboarding submitted: ${v.businessName} (${v.planName})`,
    html: renderEmail({
      preheader: `${v.businessName} finished onboarding. ${hasCustomBuild ? "Custom build details inside." : "Time to send them a payment link."}`,
      badge: { label: "Action Required", tone: "amber" },
      title: `${v.businessName} just finished onboarding`,
      bodyHtml:
        p(`<strong style="color:#ffffff;">${v.businessName}</strong> has completed their full intake for the <strong style="color:#ffffff;">${v.planName}</strong> plan.`) +
        p(`<strong style="color:#fcd34d;">Next step:</strong> review their intake, then send a Stripe Payment Link to <a href="mailto:${v.email}" style="color:#67e8f9;text-decoration:none;">${v.email}</a>. Once they pay, flip their <code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;font-size:12px;">plan_status</code> to <code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;font-size:12px;">active</code> in the admin panel.`),
      note: noteContent || undefined,
      cta: { url: `${EMAIL_SITE_URL}/admin/projects/${v.businessId}`, label: "Open Project" },
    }),
  };
}

export function followUpEmail(leadName: string, businessName: string) {
  return {
    subject: `Following up — ${businessName}`,
    html: renderEmail({
      preheader: `Just checking in about your inquiry with ${businessName}.`,
      badge: { label: "Follow Up", tone: "amber" },
      title: `Hi ${leadName}`,
      bodyHtml:
        p(`Just wanted to follow up on your recent inquiry with <strong style="color:#ffffff;">${businessName}</strong>.`) +
        p(`We'd love to help — let us know if you have any questions or want to move forward.`),
      cta: { url: `mailto:${EMAIL_SUPPORT}`, label: "Reply to Us" },
    }),
  };
}
