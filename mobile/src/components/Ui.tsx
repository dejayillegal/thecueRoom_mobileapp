import React from 'react';
import { Text, TouchableOpacity, View, TextInput, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@shared/theme';

export const Screen = (p: { children: React.ReactNode }) => (
  <View style={{ flex: 1, padding: theme.spacing(3), backgroundColor: theme.colors.background }}>{p.children}</View>
);

export const H1 = (p: { children: React.ReactNode; style?: TextStyle }) => (
  <Text style={[{ color: theme.colors.text, fontSize: 28, fontWeight: '700', marginBottom: theme.spacing(2) }, p.style]}>{p.children}</Text>
);

export const P = (p: { children: React.ReactNode; style?: TextStyle }) => (
  <Text style={[{ color: theme.colors.muted, fontSize: 16, marginBottom: theme.spacing(3) }, p.style]}>{p.children}</Text>
);

export const Button = (p: { title: string; onPress: () => void; variant?: 'primary'|'ghost'; style?: ViewStyle }) => (
  <TouchableOpacity
    onPress={p.onPress}
    style={[
      {
        paddingVertical: theme.spacing(1.5),
        paddingHorizontal: theme.spacing(2),
        borderRadius: theme.radius.lg,
        backgroundColor: p.variant === 'ghost' ? 'transparent' : theme.colors.primary,
        borderWidth: p.variant === 'ghost' ? 1 : 0,
        borderColor: theme.colors.muted,
        alignItems: 'center',
        marginBottom: theme.spacing(2)
      },
      p.style
    ]}>
    <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{p.title}</Text>
  </TouchableOpacity>
);

export const Input = (p: React.ComponentProps<typeof TextInput>) => (
  <TextInput
    placeholderTextColor={theme.colors.muted}
    style={{
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      padding: theme.spacing(1.5),
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing(2),
      borderWidth: 1,
      borderColor: '#1f263a'
    }}
    {...p}
  />
);
