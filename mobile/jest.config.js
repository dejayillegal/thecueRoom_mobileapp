/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'react-native/Libraries/BatchedBridge/NativeModules': '<rootDir>/__mocks__/NativeModules.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-clone-referenced-element|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|expo-modules-core|expo)/)'
  ],
  moduleFileExtensions: ['ts','tsx','js','jsx','json'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)']
};
