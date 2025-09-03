// Minimal RSS/Atom parsing for React Native (Hermes-safe)
import { XMLParser } from 'fast-xml-parser';

export type FeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
};

export async function fetchRss(url: string): Promise<FeedItem[]> {
  const res = await fetch(url);
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    allowBooleanAttributes: true,
    trimValues: true,
  });
  const data = parser.parse(xml);

  // Supports both RSS 2.0 and Atom minimal shapes
  if (data?.rss?.channel?.item) {
    const items = Array.isArray(data.rss.channel.item)
      ? data.rss.channel.item
      : [data.rss.channel.item];
    return items.map((i: any) => ({
      title: i.title,
      link: i.link,
      pubDate: i.pubDate || i['dc:date'],
      description: i.description,
    }));
  }

  if (data?.feed?.entry) {
    const entries = Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry];
    return entries.map((e: any) => ({
      title: e.title?.['#text'] ?? e.title,
      link: (Array.isArray(e.link) ? e.link[0] : e.link)?.href,
      pubDate: e.updated || e.published,
      description: e.summary?.['#text'] ?? e.summary,
    }));
  }

  return [];
}
