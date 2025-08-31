export const FEED_URLS = [
  'https://ra.co/xml/rss.xml',
  'https://mixmag.net/rss.xml',
  'https://djmag.com/rss.xml'
];

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  category?: string;
  region?: string;
}

interface ParserLike {
  parseURL(url: string): Promise<{ items?: Array<{ title?: string; link?: string }> }>;
}

export async function fetchFeeds(
  parser: ParserLike,
  feedUrls: string[] = FEED_URLS
): Promise<NewsItem[]> {
  const feeds = await Promise.all(
    feedUrls.map(async (url) => {
      const feed = await parser.parseURL(url);
      const source = new URL(url).hostname;
      return (feed.items || []).slice(0, 10).map((item) => ({
        title: item.title ?? '',
        link: item.link ?? '',
        source
      }));
    })
  );

  const deduped = new Map<string, NewsItem>();
  for (const item of feeds.flat()) {
    if (item.link && !deduped.has(item.link)) {
      deduped.set(item.link, item);
    }
  }
  return Array.from(deduped.values());
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  events: ['festival', 'gig', 'event'],
  releases: ['album', 'track', 'release'],
  features: ['interview', 'feature']
};

export function inferCategory(item: NewsItem): string {
  const lower = item.title.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) {
      return category;
    }
  }
  return 'general';
}

const REGION_KEYWORDS: Record<string, string[]> = {
  europe: ['berlin', 'london', 'paris'],
  asia: ['bangalore', 'mumbai', 'tokyo'],
  america: ['new york', 'los angeles', 'chicago']
};

export function inferRegion(item: NewsItem): string {
  const lower = item.title.toLowerCase();
  for (const [region, keywords] of Object.entries(REGION_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) {
      return region;
    }
  }
  return 'global';
}
