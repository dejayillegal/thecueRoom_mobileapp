-- supabase/migrations/20250221_schedule_ingestnews.sql  (update this file)
-- Enable pg_net via Dashboard (Extensions) beforehand.

-- Store (or noop if exists)
select vault.create_secret('https://heaztitsbnotkozmhubw.supabase.co', 'project_url') on conflict do nothing;
select vault.create_secret('REPLACE_WITH_PUBLISHABLE_ANON_KEY', 'anon_key') on conflict do nothing;

-- Replace existing cron job if present
select cron.unschedule('invoke-ingestnews-every-30-min')
where exists (select 1 from cron.job where jobname='invoke-ingestnews-every-30-min');

-- Schedule: every 30 minutes call the function
select cron.schedule(
  'invoke-ingestnews-every-30-min',
  '*/30 * * * *',
  $$
    select net.http_post(
      url := (select decrypted_secret from vault.decrypted_secrets where name='project_url') || '/functions/v1/ingestnews',
      headers := jsonb_build_object(
        'Content-Type','application/json',
        'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='anon_key')
      ),
      body := jsonb_build_object('scheduled_at', now())
    );
  $$
);
