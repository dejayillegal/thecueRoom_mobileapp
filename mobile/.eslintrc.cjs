module.exports = {
  root: true,
  env: { es2022: true, node: true, jest: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['node_modules/', 'android/', 'ios/', '.expo/', 'dist/', 'build/'],
  overrides: [
    { files: ['*.ts','*.tsx'], parserOptions: { project: false } }
  ],
  rules: {
    'react/react-in-jsx-scope': 'off'
  }
};

