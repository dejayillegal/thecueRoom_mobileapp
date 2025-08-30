import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './src/screens/Feed';
import Studio from './src/screens/Studio';
import Radar from './src/screens/Radar';
import News from './src/screens/News';
import Profile from './src/screens/Profile';
import { theme } from '../shared/theme';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: theme.colors.background }
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Studio" component={Studio} />
        <Tab.Screen name="Gig Radar" component={Radar} />
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
