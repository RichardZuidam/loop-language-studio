begin;

create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;

drop policy if exists "users read own state" on public.user_state;
drop policy if exists "users insert own state" on public.user_state;
drop policy if exists "users update own state" on public.user_state;
drop policy if exists "users delete own state" on public.user_state;

create policy "users read own state"
  on public.user_state for select
  using (auth.uid() = user_id);

create policy "users insert own state"
  on public.user_state for insert
  with check (auth.uid() = user_id);

create policy "users update own state"
  on public.user_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users delete own state"
  on public.user_state for delete
  using (auth.uid() = user_id);

commit;

