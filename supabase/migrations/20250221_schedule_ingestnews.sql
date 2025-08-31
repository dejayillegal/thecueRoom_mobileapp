-- Ensure pg_net is available (if not, enable it in Dashboard → Database → Extensions)
-- This migration assumes pg_cron is available in the project.

-- Store the project URL and a token we will use to call the function.
-- For public (verify_jwt = false) functions, using the anon key is acceptable.
-- If you prefer a private function, create and validate a custom header instead.
select vault.create_secret('https://heaztitsbnotkozmhubw.supabase.co', 'project_url') on conflict do nothing;
select vault.create_secret('REPLACE_WITH_PUBLISHABLE_ANON_KEY', 'anon_key') on conflict do nothing;

-- Drop any existing job with the same name to avoid duplicates.
select cron.unschedule('invoke-ingestnews-every-30-min') 
where exists (select 1 from cron.job where jobname = 'invoke-ingestnews-every-30-min');

-- Schedule: every 30 minutes call the Edge Function /functions/v1/ingestnews
select cron.schedule(
  'invoke-ingestnews-every-30-min',
  '*/30 * * * *',
  $$
    select
      net.http_post(
        url := (select decrypted_secret from vault.decrypted_secrets where name='project_url') || '/functions/v1/ingestnews',
        headers := jsonb_build_object(
          'Content-Type','application/json',
          'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='anon_key')
        ),
        body := jsonb_build_object('scheduled_at', now())
      ) as request_id;
  $$
);

-- Optional visibility while debugging:
-- select * from cron.job;
-- select * from cron.job_run_details order by start_time desc limit 20;
-- select * from net._http_response order by created desc limit 20;

