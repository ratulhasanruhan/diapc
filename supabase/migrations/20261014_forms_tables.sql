-- Applied to Supabase project "diapc" (ukhqmylxadlqzedfhtvg) as migration forms_tables.
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('project','achievement')),
  payload jsonb not null,
  submitter_email text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  ip_hash text
);
create table public.applications (id uuid primary key default gen_random_uuid(), payload jsonb not null, email text, status text not null default 'pending' check (status in ('pending','accepted','rejected')), created_at timestamptz not null default now(), ip_hash text);
create table public.contacts (id uuid primary key default gen_random_uuid(), payload jsonb not null, email text, status text not null default 'new' check (status in ('new','replied','closed')), created_at timestamptz not null default now(), ip_hash text);
create table public.collaborations (id uuid primary key default gen_random_uuid(), payload jsonb not null, email text, status text not null default 'pending' check (status in ('pending','accepted','declined')), created_at timestamptz not null default now(), ip_hash text);
create index submissions_status_created_idx on public.submissions (status, created_at desc);
create index applications_created_idx on public.applications (created_at desc);
create index contacts_created_idx on public.contacts (created_at desc);
create index collaborations_created_idx on public.collaborations (created_at desc);
-- RLS on, no policies: anon/authenticated can do nothing; only the server (service role) can insert.
alter table public.submissions enable row level security;
alter table public.applications enable row level security;
alter table public.contacts enable row level security;
alter table public.collaborations enable row level security;
revoke all on public.submissions, public.applications, public.contacts, public.collaborations from anon, authenticated;
