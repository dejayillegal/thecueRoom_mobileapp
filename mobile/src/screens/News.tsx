import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import Parser from 'rss-parser';

export default function News() {
  const [items, setItems] = useState<{ title?: string }[]>([]);

  useEffect(() => {
    const parser = new Parser();
    parser.parseURL('https://ra.co/rss').then((feed) => setItems(feed.items.slice(0, 5)));
  }, []);

  return (
    <FlatList
      data={items}
      keyExtractor={(item, idx) => String(idx)}
      renderItem={({ item }) => <Text style={{ color: 'white', padding: 8 }}>{item.title}</Text>}
    />
  );
}
