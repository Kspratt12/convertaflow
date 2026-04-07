-- Convertaflow — Storage bucket + admin policies
-- Run after 005_plan_kinds_status_events.sql

-- ============================================
-- 1. Create the client-uploads bucket
-- ============================================

-- This is idempotent: insert into storage.buckets if not exists
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'client-uploads',
  'client-uploads',
  false, -- private bucket; we serve via signed URLs
  524288000, -- 500 MB per file (videos can be large)
  null -- allow any mime type; the app validates
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit;

-- ============================================
-- 2. RLS on storage.objects for client-uploads
--
-- File path convention: {business_id}/{category}/{filename}
-- Users can only read/write inside their own business folder.
-- ============================================

-- Drop any existing policies on this bucket first (idempotent re-runs)
drop policy if exists "client-uploads — users read own" on storage.objects;
drop policy if exists "client-uploads — users insert own" on storage.objects;
drop policy if exists "client-uploads — users delete own" on storage.objects;
drop policy if exists "client-uploads — admins read all" on storage.objects;

-- Users can read files in their own business folder
create policy "client-uploads — users read own" on storage.objects
  for select
  using (
    bucket_id = 'client-uploads'
    and (
      -- first path segment must match a business_id the user owns
      split_part(name, '/', 1)::uuid in (
        select id from public.business_profiles where user_id = auth.uid()
      )
    )
  );

-- Users can upload to their own business folder
create policy "client-uploads — users insert own" on storage.objects
  for insert
  with check (
    bucket_id = 'client-uploads'
    and (
      split_part(name, '/', 1)::uuid in (
        select id from public.business_profiles where user_id = auth.uid()
      )
    )
  );

-- Users can delete from their own business folder
create policy "client-uploads — users delete own" on storage.objects
  for delete
  using (
    bucket_id = 'client-uploads'
    and (
      split_part(name, '/', 1)::uuid in (
        select id from public.business_profiles where user_id = auth.uid()
      )
    )
  );

-- Admins can read all client uploads
create policy "client-uploads — admins read all" on storage.objects
  for select
  using (
    bucket_id = 'client-uploads'
    and exists (
      select 1 from public.business_profiles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- ============================================
-- 3. Admin-side RLS — let admins read & manage everything
-- ============================================

-- business_profiles: admins read all
drop policy if exists "Admins read all profiles" on public.business_profiles;
create policy "Admins read all profiles" on public.business_profiles
  for select using (
    exists (select 1 from public.business_profiles where user_id = auth.uid() and role = 'admin')
  );

-- project_status: admins read & write all
drop policy if exists "Admins read all project status" on public.project_status;
create policy "Admins read all project status" on public.project_status
  for select using (
    exists (select 1 from public.business_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admins write all project status" on public.project_status;
create policy "Admins write all project status" on public.project_status
  for all using (
    exists (select 1 from public.business_profiles where user_id = auth.uid() and role = 'admin')
  );

-- delivery_links: admins read & write all
drop policy if exists "Admins read all delivery links" on public.delivery_links;
create policy "Admins read all delivery links" on public.delivery_links
  for select using (
    exists (select 1 from public.business_profiles where user_id = auth.uid() and role = 'admin')
  );

drop policy if exists "Admins write all delivery links" on public.delivery_links;
create policy "Admins write all delivery links" on public.delivery_links
  for all using (
    exists (select 1 from public.business_profiles where user_id = auth.uid() and role = 'admin')
  );

-- client_uploads: users can read their own (already exists from 003)
-- Admins read all
drop policy if exists "Admins read all client uploads" on public.client_uploads;
create policy "Admins read all client uploads" on public.client_uploads
  for select using (
    exists (select 1 from public.business_profiles where user_id = auth.uid() and role = 'admin')
  );
