-- Convertaflow — Plan-aware signup + billing migration
-- Run after 003_client_portal.sql

-- ============================================
-- 1. Add system_upgrade to plan_tier check
-- ============================================

alter table public.business_profiles
  drop constraint if exists business_profiles_plan_tier_check;

alter table public.business_profiles
  add constraint business_profiles_plan_tier_check
  check (plan_tier in ('starter', 'growth', 'scale', 'system_upgrade'));

-- ============================================
-- 2. Billing-related columns (idempotent)
-- ============================================

alter table public.business_profiles
  add column if not exists stripe_subscription_id text;

alter table public.business_profiles
  add column if not exists current_period_end timestamptz;

alter table public.business_profiles
  add column if not exists billing_email text;

-- ============================================
-- 3. RLS — let users insert their initial onboarding submissions
--    (the API uses the user session, but we ensure the policy exists)
-- ============================================

drop policy if exists "Users insert own onboarding" on public.onboarding_submissions;
create policy "Users insert own onboarding" on public.onboarding_submissions
  for insert with check (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

drop policy if exists "Users update own onboarding" on public.onboarding_submissions;
create policy "Users update own onboarding" on public.onboarding_submissions
  for update using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- ============================================
-- 4. RLS — let users insert/update their own project_status row
-- ============================================

drop policy if exists "Users insert own project status" on public.project_status;
create policy "Users insert own project status" on public.project_status
  for insert with check (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

drop policy if exists "Users update own project status" on public.project_status;
create policy "Users update own project status" on public.project_status
  for update using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
