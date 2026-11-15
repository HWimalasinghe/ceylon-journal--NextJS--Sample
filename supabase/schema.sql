-- Run only in your own Supabase project. The backend service role writes/reads.
create table if not exists public.inquiries (
  id uuid primary key,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','contacted','quoted','closed')),
  payload jsonb not null
);
alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;
grant select, insert, update on public.inquiries to service_role;
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
