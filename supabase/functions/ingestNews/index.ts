import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Parser from 'https://esm.sh/rss-parser@3.12.0';
import { fetchFeeds } from './utils.ts';

serve(async () => {
  const parser = new Parser();
  const items = await fetchFeeds(parser);
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' }
  });
});
