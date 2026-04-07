-- Convertaflow — track once-per-account welcome email
-- Run after 006_storage_admin.sql

-- Adds a nullable timestamp on business_profiles so the auth callback
-- can fire the welcome email exactly once per account: when the user
-- confirms their email for the first time.

alter table public.business_profiles
  add column if not exists welcome_sent_at timestamptz;

-- Backfill: any account that already exists has been around long enough
-- that we don't want to retroactively send a welcome email next time
-- they sign in. Mark them as already-welcomed.
update public.business_profiles
set welcome_sent_at = created_at
where welcome_sent_at is null;
