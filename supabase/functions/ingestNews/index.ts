import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Parser from 'https://esm.sh/rss-parser@3.12.0';

serve(async () => {
  const parser = new Parser();
  const feed = await parser.parseURL('https://ra.co/rss');
  const items = feed.items.slice(0, 10).map((i) => ({ title: i.title, link: i.link }));
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' }
  });
});
