import { Resend } from "resend";

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
  from = process.env.EMAIL_FROM || "Convertaflow <hello@convertaflow.co>",
}: SendEmailParams) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: process.env.EMAIL_REPLY_TO || "hello@convertaflow.co",
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

export function newLeadEmail(leadName: string, leadEmail: string, message?: string) {
  return {
    subject: `New lead: ${leadName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 32px; border-radius: 12px; color: white; margin-bottom: 24px;">
          <h1 style="margin: 0 0 8px; font-size: 20px; font-weight: 600;">New Lead Received</h1>
          <p style="margin: 0; opacity: 0.9; font-size: 14px;">Someone just reached out through your Convertaflow site.</p>
        </div>
        <div style="background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 12px; font-size: 14px;"><strong>Name:</strong> ${leadName}</p>
          <p style="margin: 0 0 12px; font-size: 14px;"><strong>Email:</strong> ${leadEmail}</p>
          ${message ? `<p style="margin: 0; font-size: 14px;"><strong>Message:</strong> ${message}</p>` : ""}
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; text-align: center;">Sent from Convertaflow</p>
      </div>
    `,
  };
}

export function reviewRequestEmail(businessName: string, customerName: string, reviewLink: string) {
  return {
    subject: `${businessName} would love your feedback`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #1e293b;">How was your experience?</h1>
          <p style="margin: 0; color: #64748b; font-size: 16px;">Hi ${customerName}, ${businessName} would love to hear your feedback.</p>
        </div>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${reviewLink}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">Leave a Review</a>
        </div>
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">Thank you for your time. Your feedback helps us improve.</p>
      </div>
    `,
  };
}

export function contactConfirmationEmail(name: string) {
  return {
    subject: "We received your message — Convertaflow",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #1e293b;">Thanks for reaching out, ${name}.</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">We received your message and will get back to you within one business day. In the meantime, feel free to explore our features and pricing.</p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 32px;">— The Convertaflow Team</p>
      </div>
    `,
  };
}

export function followUpEmail(leadName: string, businessName: string) {
  return {
    subject: `Following up — ${businessName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #1e293b;">Hi ${leadName},</h1>
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">Just wanted to follow up on your recent inquiry with ${businessName}. We'd love to help — let us know if you have any questions or want to move forward.</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="#" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Reply to Us</a>
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 32px;">— ${businessName} via Convertaflow</p>
      </div>
    `,
  };
}
