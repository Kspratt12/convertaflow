-- Client Portal Tables
-- Migration: 003_client_portal.sql

-- Onboarding submissions
create table if not exists public.onboarding_submissions (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.business_profiles(id) not null,
  section text not null,
  data jsonb not null default '{}',
  completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists idx_onboarding_section on public.onboarding_submissions(business_id, section);
alter table public.onboarding_submissions enable row level security;
create policy "Users manage own onboarding" on public.onboarding_submissions
  for all using (business_id in (select id from public.business_profiles where user_id = auth.uid()));

-- Client uploads/assets
create table if not exists public.client_uploads (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.business_profiles(id) not null,
  file_name text not null,
  file_url text not null,
  file_type text,
  file_size bigint,
  category text default 'general',
  created_at timestamptz default now()
);

create index if not exists idx_client_uploads_business on public.client_uploads(business_id);
alter table public.client_uploads enable row level security;
create policy "Users manage own uploads" on public.client_uploads
  for all using (business_id in (select id from public.business_profiles where user_id = auth.uid()));

-- Project status tracking
create table if not exists public.project_status (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.business_profiles(id) not null unique,
  status text not null default 'onboarding_not_started'
    check (status in ('onboarding_not_started','onboarding_in_progress','onboarding_submitted','planning','design_in_progress','revision_round','final_review','delivered','completed')),
  delivery_estimate text,
  revisions_used integer default 0,
  notes text,
  updated_at timestamptz default now()
);

alter table public.project_status enable row level security;
create policy "Users view own project status" on public.project_status
  for select using (business_id in (select id from public.business_profiles where user_id = auth.uid()));

-- Revision requests
create table if not exists public.revision_requests (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.business_profiles(id) not null,
  title text not null,
  description text not null,
  page_or_section text,
  priority text default 'normal' check (priority in ('low','normal','high')),
  status text default 'pending' check (status in ('pending','in_progress','completed')),
  file_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_revision_requests_business on public.revision_requests(business_id);
alter table public.revision_requests enable row level security;
create policy "Users manage own revisions" on public.revision_requests
  for all using (business_id in (select id from public.business_profiles where user_id = auth.uid()));

-- Support requests
create table if not exists public.support_requests (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.business_profiles(id) not null,
  subject text not null,
  message text not null,
  category text default 'question' check (category in ('question','issue','request','feedback')),
  status text default 'open' check (status in ('open','in_progress','resolved')),
  file_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_support_requests_business on public.support_requests(business_id);
alter table public.support_requests enable row level security;
create policy "Users manage own support" on public.support_requests
  for all using (business_id in (select id from public.business_profiles where user_id = auth.uid()));

-- Delivery links
create table if not exists public.delivery_links (
  id uuid default gen_random_uuid() primary key,
  business_id uuid references public.business_profiles(id) not null,
  label text not null,
  url text not null,
  link_type text default 'preview' check (link_type in ('preview','live','dashboard','other')),
  notes text,
  created_at timestamptz default now()
);

create index if not exists idx_delivery_links_business on public.delivery_links(business_id);
alter table public.delivery_links enable row level security;
create policy "Users view own delivery links" on public.delivery_links
  for select using (business_id in (select id from public.business_profiles where user_id = auth.uid()));
