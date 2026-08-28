# Production security checklist

## Required environment variables

Set these server-side in Vercel. Never expose the service role or encryption
key with a `NEXT_PUBLIC_` prefix.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `INTEGRATION_ENCRYPTION_KEY`
- `NEXT_PUBLIC_SITE_URL`

Generate the encryption key with `openssl rand -base64 32` and store it in the
deployment environment. Losing or rotating this key without re-encrypting the
stored webhook secret makes the existing secret unreadable.

Keep these development switches unset or `false` in production:

- `ALLOW_LOCAL_DATA_FALLBACK`
- `ALLOW_INSECURE_DEV_ENCRYPTION_FALLBACK`

## Supabase

Apply `supabase/migrations/20260828_security_backend_hardening.sql` before the
first production deployment. It creates private integration and lead tables,
RLS policies for authenticated admins, and the database-backed rate limiter.

Create admin accounts through Supabase Auth. This project treats every
authenticated Supabase user as a trusted Kiho admin, matching the existing RLS
model. Do not enable public sign-up.

## Google Apps Script

Copy the newly generated script from the authenticated admin page and redeploy
the Apps Script web app. Set only `RENTAL_REQUEST_WEBHOOK_SECRET` in Script
Properties. The notification email, Sheet ID, sheet name, URL, and enabled state
come from Kiho's authenticated server configuration.

## Vercel verification

After deploying:

1. Confirm anonymous `/admin` redirects to `/admin/login`.
2. Confirm anonymous `/api/admin/integrations/google-sheets`, `/api/equipment`,
   and `/api/upload` return `401`.
3. Sign in and verify the dashboard and integration actions.
4. Submit a real rental request and confirm the Supabase row exists.
5. Test with Apps Script enabled, then temporarily unavailable; the latter must
   leave the Supabase lead with `integration_status = 'failed'`.
6. Confirm past dates, reversed dates, inactive equipment, and the sixth request
   from one IP within ten minutes are rejected.

## Content Security Policy

A CSP is intentionally not enabled yet. The current application uses Next.js
runtime scripts, inline styles, Supabase, Google Maps, YouTube, and Google Apps
Script. Capture the production browser network origins first, then deploy CSP
in report-only mode before enforcing it. The other low-risk security headers
are enabled in `next.config.mjs`.
