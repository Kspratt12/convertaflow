-- Convertaflow Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- USERS & BUSINESS PROFILES
-- ============================================

create table public.business_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  business_name text not null,
  business_email text,
  phone text,
  website_url text,
  industry text,
  plan_tier text not null default 'starter' check (plan_tier in ('starter', 'growth', 'scale')),
  google_review_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- ============================================
-- LEADS
-- ============================================

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.business_profiles(id) on delete cascade not null,
  name text not null,
  email text not null,
  phone text,
  source text default 'Website',
  status text not null default 'New' check (status in ('New', 'Contacted', 'Converted', 'Lost')),
  message text,
  metadata jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- CONTACT SUBMISSIONS (public form, no auth required)
-- ============================================

create table public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  business_type text,
  interest text,
  message text,
  created_at timestamptz not null default now()
);

-- ============================================
-- REVIEW REQUESTS
-- ============================================

create table public.review_requests (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.business_profiles(id) on delete cascade not null,
  customer_name text not null,
  customer_email text not null,
  status text not null default 'Sent' check (status in ('Sent', 'Opened', 'Completed')),
  rating integer check (rating >= 1 and rating <= 5),
  review_url text,
  sent_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ============================================
-- EMAIL EVENTS
-- ============================================

create table public.email_events (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.business_profiles(id) on delete cascade not null,
  email_type text not null check (email_type in ('lead_notification', 'review_request', 'follow_up', 'confirmation')),
  recipient_email text not null,
  subject text not null,
  status text not null default 'Sent' check (status in ('Sent', 'Delivered', 'Opened', 'Clicked', 'Bounced')),
  resend_id text,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

-- ============================================
-- SOCIAL LINKS
-- ============================================

create table public.social_links (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.business_profiles(id) on delete cascade not null,
  platform text not null,
  url text not null,
  clicks integer not null default 0,
  impressions integer not null default 0,
  is_connected boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- ACTIVITY LOG
-- ============================================

create table public.activity_logs (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references public.business_profiles(id) on delete cascade not null,
  action text not null,
  target text,
  type text not null check (type in ('lead', 'review', 'email', 'social', 'system')),
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table public.business_profiles enable row level security;
alter table public.leads enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.review_requests enable row level security;
alter table public.email_events enable row level security;
alter table public.social_links enable row level security;
alter table public.activity_logs enable row level security;

-- Business profiles: users can only see/edit their own
create policy "Users can view own profile" on public.business_profiles
  for select using (auth.uid() = user_id);
create policy "Users can update own profile" on public.business_profiles
  for update using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.business_profiles
  for insert with check (auth.uid() = user_id);

-- Leads: users can manage leads for their business
create policy "Users can view own leads" on public.leads
  for select using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
create policy "Users can insert leads for own business" on public.leads
  for insert with check (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
create policy "Users can update own leads" on public.leads
  for update using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- Contact submissions: anyone can insert (public form), only admins can view
create policy "Anyone can submit contact form" on public.contact_submissions
  for insert with check (true);

-- Review requests: users can manage for their business
create policy "Users can view own review requests" on public.review_requests
  for select using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
create policy "Users can insert review requests" on public.review_requests
  for insert with check (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
create policy "Users can update own review requests" on public.review_requests
  for update using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- Email events: users can view for their business
create policy "Users can view own email events" on public.email_events
  for select using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
create policy "Users can insert email events" on public.email_events
  for insert with check (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- Social links: users can manage for their business
create policy "Users can view own social links" on public.social_links
  for select using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
create policy "Users can manage own social links" on public.social_links
  for all using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- Activity logs: users can view for their business
create policy "Users can view own activity" on public.activity_logs
  for select using (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );
create policy "Users can insert own activity" on public.activity_logs
  for insert with check (
    business_id in (select id from public.business_profiles where user_id = auth.uid())
  );

-- ============================================
-- INDEXES
-- ============================================

create index idx_leads_business_id on public.leads(business_id);
create index idx_leads_status on public.leads(status);
create index idx_leads_created_at on public.leads(created_at desc);
create index idx_review_requests_business_id on public.review_requests(business_id);
create index idx_email_events_business_id on public.email_events(business_id);
create index idx_activity_logs_business_id on public.activity_logs(business_id);
create index idx_activity_logs_created_at on public.activity_logs(created_at desc);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.business_profiles
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.leads
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.social_links
  for each row execute function public.handle_updated_at();
