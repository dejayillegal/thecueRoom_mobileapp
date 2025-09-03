module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  transform: { '^.+\\.(js|jsx|ts|tsx)$': require.resolve('babel-jest') },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
      + '|@react-native'
      + '|react-clone-referenced-element'
      + '|@react-navigation'
      + '|react-native-reanimated'
      + '|react-native-gesture-handler'
      + '|react-native-safe-area-context'
      + '|react-native-screens'
      + ')/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts','tsx','js','jsx','json'],
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)'],
};
