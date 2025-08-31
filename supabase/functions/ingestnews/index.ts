import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Parser from 'https://esm.sh/rss-parser@3.12.0';
import { fetchFeeds, inferCategory, inferRegion } from './utils.ts';
import { adminClient } from '../utils/client.ts';
const kv = await Deno.openKv();

serve(async () => {
  const parser = new Parser();
  const items = await fetchFeeds(parser);
  const enriched = items.map((i) => ({
    ...i,
    category: inferCategory(i),
    region: inferRegion(i),
  }));

  for (const item of enriched) {
    await adminClient.from('news').upsert(item, { onConflict: 'link' });
    await kv.set(['news', item.link], item, { expireIn: 1000 * 60 * 30 });
  }

  return new Response(JSON.stringify(enriched), {
    headers: { 'Content-Type': 'application/json' },
  });
});
