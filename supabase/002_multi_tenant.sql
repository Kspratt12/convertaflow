-- Convertaflow Multi-Tenant Upgrade
-- Run this AFTER the initial schema.sql

-- ============================================
-- BUSINESS PROFILES — add slug, branding, role
-- ============================================

-- Unique slug for URL-based business identification (e.g. /b/prestige-home)
alter table public.business_profiles
  add column if not exists slug text unique;

-- Role within the platform (owner manages their business, admin manages all)
alter table public.business_profiles
  add column if not exists role text not null default 'owner'
  check (role in ('owner', 'admin'));

-- Branding fields for future white-label support
alter table public.business_profiles
  add column if not exists logo_url text;
alter table public.business_profiles
  add column if not exists brand_color text default '#7c3aed';
alter table public.business_profiles
  add column if not exists tagline text;
alter table public.business_profiles
  add column if not exists address text;
alter table public.business_profiles
  add column if not exists timezone text default 'America/New_York';

-- Plan billing fields
alter table public.business_profiles
  add column if not exists plan_started_at timestamptz default now();
alter table public.business_profiles
  add column if not exists plan_status text not null default 'active'
  check (plan_status in ('active', 'trial', 'past_due', 'canceled'));
alter table public.business_profiles
  add column if not exists stripe_customer_id text;

-- ============================================
-- LEADS — add assigned_to for team support
-- ============================================

alter table public.leads
  add column if not exists assigned_to uuid references auth.users(id);
alter table public.leads
  add column if not exists notes text;

-- ============================================
-- CONTACT SUBMISSIONS — link to business if submitted on a client site
-- ============================================

alter table public.contact_submissions
  add column if not exists business_id uuid references public.business_profiles(id);

-- ============================================
-- INDEXES for new columns
-- ============================================

create index if not exists idx_business_profiles_slug on public.business_profiles(slug);
create index if not exists idx_business_profiles_role on public.business_profiles(role);
create index if not exists idx_contact_submissions_business on public.contact_submissions(business_id);

-- ============================================
-- RLS for contact submissions by business
-- ============================================

-- Business owners can view contact submissions linked to their business
create policy "Users can view own contact submissions" on public.contact_submissions
  for select using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- ============================================
-- Function to auto-generate slug from business name
-- ============================================

create or replace function public.generate_slug(name text)
returns text as $$
begin
  return lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
end;
$$ language plpgsql;

-- Auto-set slug on insert if not provided
create or replace function public.auto_slug()
returns trigger as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug = public.generate_slug(new.business_name) || '-' || substr(new.id::text, 1, 8);
  end if;
  return new;
end;
$$ language plpgsql;

create trigger set_slug before insert on public.business_profiles
  for each row execute function public.auto_slug();
