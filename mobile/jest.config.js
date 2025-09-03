/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  // Let jest-expo set the right environment/transformer
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // <-- map @/ alias for tests
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
      + '|@react-native'
      + '|@react-navigation'
      + '|react-clone-referenced-element'
      + '|react-native-reanimated'
      + '|react-native-gesture-handler'
      + '|react-native-safe-area-context'
      + '|react-native-screens'
      + ')/)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)'],
};
