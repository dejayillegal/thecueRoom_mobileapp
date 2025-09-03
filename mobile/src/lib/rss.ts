import { XMLParser } from 'fast-xml-parser';

export type FeedItem = { title?: string; link?: string; pubDate?: string; description?: string; };

export async function fetchRss(url: string): Promise<FeedItem[]> {
  const res = await fetch(url);
  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '', trimValues: true });
  const data = parser.parse(xml);

  if (data?.rss?.channel?.item) {
    const arr = Array.isArray(data.rss.channel.item) ? data.rss.channel.item : [data.rss.channel.item];
    return arr.map((i: any) => ({ title: i.title, link: i.link, pubDate: i.pubDate || i['dc:date'], description: i.description }));
  }
  if (data?.feed?.entry) {
    const arr = Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry];
    return arr.map((e: any) => ({
      title: e.title?.['#text'] ?? e.title,
      link: (Array.isArray(e.link) ? e.link[0] : e.link)?.href,
      pubDate: e.updated || e.published,
      description: e.summary?.['#text'] ?? e.summary,
    }));
  }
  return [];
}
