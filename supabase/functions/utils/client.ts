import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const adminClient = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SECRET_KEY')!,
);
