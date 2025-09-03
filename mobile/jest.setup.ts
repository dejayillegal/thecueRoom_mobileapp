import '@testing-library/jest-native/extend-expect';

// Silence Animated warnings
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));

// Reanimated v3 mock (must be before any import using it)
jest.mock('react-native-reanimated', () => {
  const mock = require('react-native-reanimated/mock');
  mock.default.call = () => {};
  return mock;
});
(global as any).__reanimatedWorkletInit = (fn: any) => fn();

// RNGH setup
import 'react-native-gesture-handler/jestSetup';

// Screens + Safe Area mocks fix "invalid element type" in nav
jest.mock('react-native-screens', () => require('react-native-screens/mock'));
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock')
);
