/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any, no-empty */
// Add matchers
try {
  // safe in RN; if it ever breaks, tests still run
  require('@testing-library/jest-native/extend-expect');
} catch {}

/** Silence RN Animated warnings */
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));

/** Reanimated v3 mock (must be defined before any reanimated usage) */
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
// Worklet init polyfill
(global as any).__reanimatedWorkletInit = (fn: any) => fn();

/** RNGH test setup (press/gesture events) */
import 'react-native-gesture-handler/jestSetup';

/** Screens & Safe Area mocks prevent "invalid element type" */
jest.mock('react-native-screens', () => require('react-native-screens/mock'));
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock')
);
