import React from 'react';
import { View, Text } from 'react-native';
import Logo from '../../../shared/Logo';

export default function Profile() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Logo />
      <Text style={{ color: 'white', marginTop: 16 }}>User Profile</Text>
    </View>
  );
}
