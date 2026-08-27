-- WAFW portal: core schema, RLS policies, storage buckets
-- Safe to re-run: every statement is idempotent.

-- ============================================================
-- Facilitators
-- ============================================================
create table if not exists public.facilitators (
  id uuid primary key default gen_random_uuid(),
  legacy_no integer,
  full_name text not null,
  slug text not null unique,
  status_code text,
  location text,
  mobile text,
  email text,
  street_address text,
  certification_info text,
  facilitation_locations text,
  facilitation_dates text,
  modules_facilitated text,
  attended_community_call text,
  notes text,
  short_bio text,
  photo_path text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists facilitators_status_idx on public.facilitators (status_code);
create index if not exists facilitators_is_public_idx on public.facilitators (is_public);
create index if not exists facilitators_location_idx on public.facilitators (location);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists facilitators_set_updated_at on public.facilitators;
create trigger facilitators_set_updated_at
before update on public.facilitators
for each row execute function public.set_updated_at();

-- ============================================================
-- Status lookup (legend describing the C/F/W/I/N/R/U/UNS codes)
-- ============================================================
create table if not exists public.status_lookup (
  code text primary key,
  label text not null,
  description text
);

-- ============================================================
-- Admin allowlist (which auth.users may manage the portal)
-- ============================================================
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.facilitators enable row level security;
alter table public.status_lookup enable row level security;
alter table public.admins enable row level security;

drop policy if exists "facilitators_admin_all" on public.facilitators;
create policy "facilitators_admin_all" on public.facilitators
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "status_lookup_public_read" on public.status_lookup;
create policy "status_lookup_public_read" on public.status_lookup
  for select
  using (true);

drop policy if exists "status_lookup_admin_write" on public.status_lookup;
create policy "status_lookup_admin_write" on public.status_lookup
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins_self_read" on public.admins;
create policy "admins_self_read" on public.admins
  for select
  using (public.is_admin());

-- ============================================================
-- Public-safe view: only non-PII columns, only rows marked public.
-- Intentionally NOT security_invoker, so it runs with the view
-- owner's privileges and can read past the admin-only RLS above
-- while only ever exposing the columns listed here. Never add
-- mobile / email / street_address / notes to this view.
-- ============================================================
create or replace view public.public_facilitators as
select
  id,
  slug,
  full_name,
  location,
  status_code,
  facilitation_locations,
  facilitation_dates,
  modules_facilitated,
  short_bio,
  photo_path,
  created_at
from public.facilitators
where is_public = true;

grant select on public.public_facilitators to anon, authenticated;
grant select on public.status_lookup to anon, authenticated;

-- ============================================================
-- Storage buckets
-- ============================================================
insert into storage.buckets (id, name, public)
values ('facilitator-photos', 'facilitator-photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

drop policy if exists "facilitator_photos_public_read" on storage.objects;
create policy "facilitator_photos_public_read"
on storage.objects for select
using (bucket_id = 'facilitator-photos');

drop policy if exists "facilitator_photos_admin_insert" on storage.objects;
create policy "facilitator_photos_admin_insert"
on storage.objects for insert
with check (bucket_id = 'facilitator-photos' and public.is_admin());

drop policy if exists "facilitator_photos_admin_update" on storage.objects;
create policy "facilitator_photos_admin_update"
on storage.objects for update
using (bucket_id = 'facilitator-photos' and public.is_admin());

drop policy if exists "facilitator_photos_admin_delete" on storage.objects;
create policy "facilitator_photos_admin_delete"
on storage.objects for delete
using (bucket_id = 'facilitator-photos' and public.is_admin());

drop policy if exists "site_assets_public_read" on storage.objects;
create policy "site_assets_public_read"
on storage.objects for select
using (bucket_id = 'site-assets');

drop policy if exists "site_assets_admin_insert" on storage.objects;
create policy "site_assets_admin_insert"
on storage.objects for insert
with check (bucket_id = 'site-assets' and public.is_admin());

drop policy if exists "site_assets_admin_update" on storage.objects;
create policy "site_assets_admin_update"
on storage.objects for update
using (bucket_id = 'site-assets' and public.is_admin());

drop policy if exists "site_assets_admin_delete" on storage.objects;
create policy "site_assets_admin_delete"
on storage.objects for delete
using (bucket_id = 'site-assets' and public.is_admin());
