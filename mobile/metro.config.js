// @ts-check
const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

/** @type {import('metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Watch monorepo root so imports like ../shared/... work
config.watchFolders = Array.from(new Set([...(config.watchFolders ?? []), workspaceRoot]));

// Resolve modules from both /mobile and repo root node_modules
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: Array.from(new Set([
    path.join(projectRoot, 'node_modules'),
    path.join(workspaceRoot, 'node_modules'),
  ])),
  unstable_enableSymlinks: true,
  // Prefer RN/browser builds over Node "main"
  resolverMainFields: ['react-native', 'browser', 'main'],
  extraNodeModules: {
    '@shared': path.join(workspaceRoot, 'shared'),
  },
  unstable_conditionNames: [
    'require',
    'import',
    'react-native',
    'browser',
    'default',
  ],
};

module.exports = config;
