import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { fetchRss } from '../lib/rss';
import { theme } from '../../../shared/theme';

export default function News() {
  const [items, setItems] = useState<{ title?: string }[]>([]);

  useEffect(() => {
    fetchRss('https://ra.co/rss').then((feed) => setItems(feed.items.slice(0, 5)));
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item, idx) => String(idx)}
      renderItem={({ item }) => (
        <Text style={{ color: theme.colors.fg, padding: 8 }}>{item.title}</Text>
      )}
    />
  );
}
