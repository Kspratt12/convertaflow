# Supabase Auth Email Templates

These are branded HTML templates for the auth emails Supabase sends on your
behalf (signup confirmation, password reset, magic links, etc.). Supabase's
default templates are plain text and break the brand the moment a customer
gets one. These match the premium dark Convertaflow shell used everywhere
else (`src/lib/email-layout.ts`).

## How to install

For each template below, open the corresponding template in the
**Supabase dashboard** and paste the contents of the matching `.html` file
into the **Message body** field. Don't change the **Subject** unless you
want to.

> Project Settings → Authentication → Email Templates

| Supabase template name      | Paste this file               | Suggested subject                                          |
| --------------------------- | ----------------------------- | ---------------------------------------------------------- |
| **Confirm signup**          | `confirm-signup.html`         | `Confirm your Convertaflow account`                        |
| **Reset password**          | `reset-password.html`         | `Reset your Convertaflow password`                         |
| **Magic Link**              | `magic-link.html`             | `Your Convertaflow sign-in link`                           |
| **Change Email Address**    | `change-email.html`           | `Confirm your new Convertaflow email`                      |
| **Invite user**             | `invite-user.html`            | `You've been invited to Convertaflow`                      |
| **Reauthentication**        | `reauthentication.html`       | `Confirm it's you — Convertaflow`                          |

After pasting each one, click **Save** at the bottom of the page.

## Variables Supabase fills in

Each template uses Supabase's Go-template syntax. You don't need to touch
these — Supabase replaces them automatically when sending:

- `{{ .ConfirmationURL }}` — the action link (verify, reset, sign in)
- `{{ .Email }}` — the recipient's email
- `{{ .Token }}` — the 6-digit OTP (used in some templates as a fallback)
- `{{ .SiteURL }}` — your site URL configured in Supabase

## Testing

After installing, test each one:

1. **Confirm signup** → sign up a new test account at `/signup`
2. **Reset password** → visit `/forgot-password` and submit your email
3. **Magic link** → only if you have magic links enabled
4. **Change email** → update your email in account settings (when wired)
5. **Invite user** → from the Supabase dashboard, invite a user
6. **Reauthentication** → if MFA / step-up auth is configured

## When to update

If you ever change the brand colors, logo URL, or footer copy, update
`src/lib/email-layout.ts` AND re-stamp these templates so they stay in
sync. There is no automated link between the two — they are intentionally
duplicated because Supabase pastes raw HTML and can't import from your repo.
