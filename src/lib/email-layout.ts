/**
 * Shared premium email layout — dark Convertaflow theme.
 *
 * Used by every outbound email (marketing + transactional + project
 * lifecycle) so the brand is consistent in every inbox. See email.ts
 * for marketing templates and email-events.ts for project lifecycle.
 */

export const EMAIL_SITE_URL = "https://www.convertaflow.co";
export const EMAIL_PORTAL_URL = "https://www.convertaflow.co/portal";
export const EMAIL_LOGO_URL = "https://www.convertaflow.co/convertaflow-c.png";
export const EMAIL_SUPPORT = "hello@convertaflow.co";
export const EMAIL_BRAND = "Convertaflow";

/* Theme tokens */
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

export type BadgeTone = "purple" | "blue" | "amber" | "emerald";

const TONE_STYLES: Record<BadgeTone, { bg: string; border: string; text: string }> = {
  purple: { bg: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.35)", text: "#c4b5fd" },
  blue: { bg: "rgba(6,182,212,0.10)", border: "rgba(6,182,212,0.35)", text: "#67e8f9" },
  amber: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.35)", text: "#fcd34d" },
  emerald: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.35)", text: "#6ee7b7" },
};

export interface RenderEmailOptions {
  preheader: string;
  title: string;
  bodyHtml: string;
  badge?: { label: string; tone: BadgeTone };
  progress?: { percent: number; label: string };
  note?: string;
  cta?: { url: string; label: string };
}

/* Paragraph helper — use inside bodyHtml for consistent spacing */
export function p(html: string): string {
  return `<p style="margin:0 0 14px;">${html}</p>`;
}

function renderBadge(label: string, tone: BadgeTone): string {
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
        <div style="font-size:10px;font-weight:600;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Details</div>
        ${message}
      </td>
    </tr>
  </table>`;
}

/**
 * Render a full branded email (returns a complete HTML document).
 */
export function renderEmail(opts: RenderEmailOptions): string {
  const { preheader, title, bodyHtml, badge, progress, note, cta } = opts;

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
                  <img src="${EMAIL_LOGO_URL}" width="32" height="32" alt="${EMAIL_BRAND}" style="display:block;border:0;outline:none;text-decoration:none;height:32px;width:32px;" />
                </td>
                <td style="vertical-align:middle;">
                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:18px;font-weight:700;color:${TEXT_PRIMARY};letter-spacing:-0.01em;">${EMAIL_BRAND}</div>
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

                  ${note ? renderNoteBlock(note) : ""}

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
              Questions? Reply to this email or contact <a href="mailto:${EMAIL_SUPPORT}" style="color:${BRAND_CYAN};text-decoration:none;">${EMAIL_SUPPORT}</a>
            </div>
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.25);margin-top:14px;">
              <a href="${EMAIL_SITE_URL}" target="_blank" style="color:rgba(255,255,255,0.35);text-decoration:none;">${EMAIL_BRAND}</a> · Premium websites and growth systems
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
