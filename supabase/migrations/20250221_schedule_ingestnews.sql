-- Assumes pg_cron & pg_net are enabled (by prior migration or Dashboard).

-- Upsert project_url in Vault
do $$
declare sid uuid;
begin
  select id into sid from vault.decrypted_secrets where name = 'project_url' limit 1;
  if sid is null then
    perform vault.create_secret('https://heaztitsbnotkozmhubw.supabase.co','project_url','Project URL');
  else
    perform vault.update_secret(sid,'https://heaztitsbnotkozmhubw.supabase.co','project_url','Project URL');
  end if;
end $$;

-- Upsert anon_key placeholder; real value set by CI later
do $$
declare sid uuid;
begin
  if not exists (select 1 from vault.decrypted_secrets where name='anon_key') then
    perform vault.create_secret('SET_BY_CI','anon_key','Anon key for cron calls');
  end if;
end $$;

-- Remove existing job if present
select cron.unschedule('invoke-ingestnews-every-30-min')
where exists (select 1 from cron.job where jobname='invoke-ingestnews-every-30-min');

-- Schedule every 30 minutes
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
