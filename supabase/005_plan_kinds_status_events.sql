-- Convertaflow — Plan kinds, project status enum, email events
-- Run after 004_signup_billing.sql

-- ============================================
-- 1. Add scale_single to plan_tier check
-- ============================================

alter table public.business_profiles
  drop constraint if exists business_profiles_plan_tier_check;

alter table public.business_profiles
  add constraint business_profiles_plan_tier_check
  check (plan_tier in ('starter', 'growth', 'scale', 'system_upgrade', 'scale_single'));

-- ============================================
-- 2. Extend project_status check with milestone + lifecycle states
-- ============================================

alter table public.project_status
  drop constraint if exists project_status_status_check;

alter table public.project_status
  add constraint project_status_status_check
  check (status in (
    'not_started',
    'onboarding_in_progress',
    'onboarding_submitted',
    'planning',
    'in_progress',
    'milestone_25',
    'milestone_50',
    'milestone_75',
    'revision_round',
    'final_review',
    'delivered',
    'completed'
  ));

-- Default for new project_status rows
alter table public.project_status
  alter column status set default 'not_started';

-- ============================================
-- 3. email_events — extend allowed types to include project lifecycle events
--    (this table already exists from schema.sql)
-- ============================================

alter table public.email_events
  drop constraint if exists email_events_email_type_check;

alter table public.email_events
  add constraint email_events_email_type_check
  check (email_type in (
    -- legacy lead emails
    'lead_notification',
    'review_request',
    'follow_up',
    'confirmation',
    -- project lifecycle events
    'welcome',
    'onboarding_started',
    'onboarding_submitted',
    'project_started',
    'milestone_25',
    'milestone_50',
    'milestone_75',
    'revision_started',
    'completed',
    'delivery_sent'
  ));

-- Allow Queued status (in addition to existing values)
alter table public.email_events
  drop constraint if exists email_events_status_check;

alter table public.email_events
  add constraint email_events_status_check
  check (status in ('Queued', 'Sent', 'Delivered', 'Opened', 'Clicked', 'Bounced'));

-- ============================================
-- 4. RLS — let users insert email_events for their own business
--    (the API uses the user session — admin events are server-side)
-- ============================================

drop policy if exists "Users insert own email events" on public.email_events;
create policy "Users insert own email events" on public.email_events
  for insert with check (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

drop policy if exists "Users update own email events" on public.email_events;
create policy "Users update own email events" on public.email_events
  for update using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- ============================================
-- 5. client_uploads — add file_kind for video uploads + index
-- ============================================

alter table public.client_uploads
  add column if not exists file_kind text default 'file'
  check (file_kind in ('file', 'image', 'document', 'video', 'logo', 'brand'));

create index if not exists idx_client_uploads_kind on public.client_uploads(business_id, file_kind);
