import * as rssParser from 'react-native-rss-parser';

export async function fetchRss(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  // react-native-rss-parser returns a normalized object: { title, items: [{title, links, ...}], ... }
  const feed = await rssParser.parse(xml);
  return feed;
}
