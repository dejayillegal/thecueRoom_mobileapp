import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Parser from 'https://esm.sh/rss-parser@3.12.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fetchFeeds, inferCategory, inferRegion } from './utils.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);
const kv = await Deno.openKv();

serve(async () => {
  const parser = new Parser();
  const items = await fetchFeeds(parser);
  const enriched = items.map((i) => ({
    ...i,
    category: inferCategory(i),
    region: inferRegion(i)
  }));

  for (const item of enriched) {
    await supabase.from('news').upsert(item, { onConflict: 'link' });
    await kv.set(['news', item.link], item, { expireIn: 1000 * 60 * 30 });
  }

  return new Response(JSON.stringify(enriched), {
    headers: { 'Content-Type': 'application/json' }
  });
});
