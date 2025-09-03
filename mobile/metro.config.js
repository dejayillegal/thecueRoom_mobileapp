// @ts-check
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

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

// Ensure single instance of each RN module (avoid duplicate copies in monorepo)
config.resolver.disableHierarchicalLookup = true;

/**
 * Throw if a Node builtin sneaks into the RN bundle.
 * This surfaces "why Hermes blew up" with a clear message.
 */
const FORBIDDEN = new Set([
  'http','https','url','fs','path','zlib','stream','crypto','util','net','tls','events'
]);

const origResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (ctx, moduleName, platform) => {
  if (FORBIDDEN.has(moduleName)) {
    throw new Error(`[mobile] Node builtin "${moduleName}" imported – not supported in React Native/Hermes.`);
  }
  return origResolveRequest
    ? origResolveRequest(ctx, moduleName, platform)
    : require('metro-resolver').resolve(ctx, moduleName, platform);
};

module.exports = config;
