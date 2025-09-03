import '@testing-library/jest-native/extend-expect';

// RN animated helper noise
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({}));

// Reanimated mock
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
(global as any).__reanimatedWorkletInit = (fn: any) => fn();

// RNGH setup (press/gesture events)
import 'react-native-gesture-handler/jestSetup';

// Mock native screens + safe area (prevents "invalid element type")
jest.mock('react-native-screens', () => require('react-native-screens/mock'));
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock')
);

