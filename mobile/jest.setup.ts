global.__DEV__ = true;
global.__fbBatchedBridgeConfig = { nativeModules: {} };
require('@testing-library/jest-native/extend-expect');

// RN animated helper noise
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));

// Reanimated mock (must be before any reanimated usage)
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  // Work around Reanimated mock missing this
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {};
  return Reanimated;
});

// RNGH jest setup (fixes press/gesture events in tests)
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  return {
    GestureHandlerRootView: ({ children }: any) => React.createElement(React.Fragment, null, children)
  };
});

// React Native core mocks
jest.mock('react-native', () => {
  const React = require('react');
  return {
    View: ({ children }: any) => React.createElement(React.Fragment, null, children),
    ActivityIndicator: () => null,
  };
});

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({ children, testID }: any) =>
      React.createElement(React.Fragment, { testID }, children),
    DefaultTheme: {},
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: any) => React.createElement(React.Fragment, null, children),
      Screen: ({ children }: any) => React.createElement(React.Fragment, null, children),
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');
  return {
    createBottomTabNavigator: () => ({
      Navigator: ({ children }: any) => React.createElement(React.Fragment, null, children),
      Screen: ({ children }: any) => React.createElement(React.Fragment, null, children),
    }),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

jest.mock('react-native-screens', () => ({ enableScreens: () => {} }));

jest.mock('./src/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  },
}));

// Silence noisy timers/logs in tests if needed
const originalError = console.error;
console.error = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('useNativeDriver')) return;
  originalError(...args);
};
