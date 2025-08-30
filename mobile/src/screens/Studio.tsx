import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../shared/theme';

export default function Studio() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: theme.colors.fg }}>Studio: Meme Generator coming soon</Text>
    </View>
  );
}
