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
