import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { fetchRss, type FeedItem } from '@/lib/rss';
import { theme } from '../../../shared/theme';

export default function News() {
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    fetchRss('https://ra.co/rss').then((list) => setItems(list.slice(0, 5)));
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
