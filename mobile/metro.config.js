// @ts-check
const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..'); // repo root

/** @type {import('metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// 1) Watch the whole monorepo
config.watchFolders = [workspaceRoot];

// 2) Resolve modules from both /mobile and the repo root node_modules
config.resolver.nodeModulesPaths = [
  path.join(projectRoot, 'node_modules'),
  path.join(workspaceRoot, 'node_modules'),
];

// 3) Follow symlinks (useful with workspaces)
config.resolver.unstable_enableSymlinks = true;

// 4) (Optional) be explicit about condition names
config.resolver.unstable_conditionNames = [
  'require',
  'import',
  'react-native',
  'browser',
  'default',
];

module.exports = config;
