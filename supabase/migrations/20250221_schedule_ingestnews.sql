-- Ensure pg_cron & pg_net are available
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-----------------------------
-- Upsert Vault: project_url
-----------------------------
do $$
declare sid uuid;
begin
  select id into sid from vault.decrypted_secrets where name = 'project_url' limit 1;

  if sid is null then
    perform vault.create_secret(
      'https://heaztitsbnotkozmhubw.supabase.co',
      'project_url',
      'Base URL for this Supabase project'
    );
  else
    perform vault.update_secret(
      sid,
      'https://heaztitsbnotkozmhubw.supabase.co',
      'project_url',
      'Base URL for this Supabase project'
    );
  end if;
end $$;

---------------------------
-- Upsert Vault: anon_key
---------------------------
do $$
declare sid uuid;
begin
  -- Replace placeholder before applying, or update via SQL after db push.
  select id into sid from vault.decrypted_secrets where name = 'anon_key' limit 1;

  if sid is null then
    perform vault.create_secret(
      'REPLACE_WITH_PUBLISHABLE_ANON_KEY',
      'anon_key',
      'Publishable anon key used to call Edge Functions from cron'
    );
  else
    perform vault.update_secret(
      sid,
      'REPLACE_WITH_PUBLISHABLE_ANON_KEY',
      'anon_key',
      'Publishable anon key used to call Edge Functions from cron'
    );
  end if;
end $$;

-----------------------------------------
-- (Re)Schedule the ingestnews invocation
-----------------------------------------
-- Remove any existing job with same name
select cron.unschedule('invoke-ingestnews-every-30-min')
where exists (select 1 from cron.job where jobname = 'invoke-ingestnews-every-30-min');

-- Schedule: every 30 minutes
select
  cron.schedule(
    'invoke-ingestnews-every-30-min',
    '*/30 * * * *',
    $$
      select net.http_post(
        url := (select decrypted_secret from vault.decrypted_secrets where name = 'project_url')
               || '/functions/v1/ingestnews',
        headers := jsonb_build_object(
          'Content-Type','application/json',
          'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'anon_key')
        ),
        body := jsonb_build_object('scheduled_at', now())
      );
    $$
  );
