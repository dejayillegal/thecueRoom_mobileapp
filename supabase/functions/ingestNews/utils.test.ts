import { fetchFeeds, inferCategory, inferRegion } from './utils';

test('fetchFeeds dedupes and caps items per feed', async () => {
  const parser = {
    parseURL: async () => ({
      items: Array.from({ length: 12 }, (_, i) => ({
        title: `title${i}`,
        link: `link${i % 5}`
      }))
    })
  };
  const items = await fetchFeeds(parser, ['https://example.com/rss']);
  expect(items).toHaveLength(5);
  expect(items[0].source).toBe('example.com');
});

test('infers category and region from title', () => {
  const item = {
    title: 'Berlin festival announces lineup',
    link: '',
    source: ''
  };
  expect(inferCategory(item)).toBe('events');
  expect(inferRegion(item)).toBe('europe');
});
