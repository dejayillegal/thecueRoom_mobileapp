// Expo-friendly Jest config for React Native + TS
const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-clone-referenced-element' +
      '|@react-navigation' +
      '|react-native-reanimated' +
      '|react-native-gesture-handler' +
      ')/)'
  ],
  setupFiles: [],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    'App.tsx'
  ],
  coverageThreshold: {
    global: { lines: 1, statements: 1 }
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/../shared/$1'
  }
};
