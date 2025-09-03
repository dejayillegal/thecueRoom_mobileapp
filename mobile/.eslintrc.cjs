module.exports = {
  root: true,
  env: { es2022: true, node: true, jest: true },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'jest', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: { project: ['./tsconfig.json'] },
      node: { extensions: ['.js','.jsx','.ts','.tsx'] }
    }
  },
  ignorePatterns: ['node_modules/','android/','ios/','.expo/','dist/','build/'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'import/no-unresolved': 'error'
  },
  overrides: [
    {
      files: ['*.config.js','metro.config.js','jest.config.js','babel.config.js'],
      rules: {
        // allow CommonJS in config files
        'import/no-commonjs': 'off',
        '@typescript-eslint/no-require-imports': 'off'
      }
    }
  ]
};
