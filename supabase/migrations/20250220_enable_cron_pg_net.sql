-- Enable required extensions locally (Supabase Docker image includes them).
-- NOTE: On hosted Supabase, enable these from Dashboard > Database > Extensions.

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Optional: verify they exist (no-op if missing on hosted where creation isn't allowed)
-- select * from pg_extension where extname in ('pg_cron','pg_net');

