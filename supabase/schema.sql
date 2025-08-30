create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text,
  created_at timestamptz default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  content text,
  media_url text,
  created_at timestamptz default now()
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  content text,
  created_at timestamptz default now()
);

create table reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  type text,
  created_at timestamptz default now()
);

create table venues (
  id uuid primary key default gen_random_uuid(),
  name text,
  city text,
  country text
);

create table gigs (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id),
  title text,
  start_time timestamptz,
  end_time timestamptz
);

create table news (
  id uuid primary key default gen_random_uuid(),
  source text,
  title text,
  url text,
  category text,
  region text,
  published_at timestamptz
);

create table rooms (
  id uuid primary key default gen_random_uuid(),
  topic text
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references rooms(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  content text,
  created_at timestamptz default now()
);

create table tools (
  id uuid primary key default gen_random_uuid(),
  name text
);

create table flags (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  reason text,
  created_at timestamptz default now()
);

create table featureFlags (
  key text primary key,
  enabled boolean not null default true
);
