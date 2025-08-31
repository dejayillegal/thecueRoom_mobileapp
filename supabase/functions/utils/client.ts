import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const adminClient = createClient(
  Deno.env.get('NEWS_SUPABASE_URL')!,
  Deno.env.get('NEWS_SERVICE_ROLE_KEY')!,
);
