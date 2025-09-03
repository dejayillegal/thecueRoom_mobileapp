// Keep setup minimal & safe
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
(global as any).__reanimatedWorkletInit = (fn: any) => fn();
(global as any).__fbBatchedBridgeConfig = {};

import 'react-native-gesture-handler/jestSetup';
jest.mock('react-native-screens', () => require('react-native-screens/mock'));
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock')
);
