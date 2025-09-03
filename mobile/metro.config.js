const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// Block Node core modules from RN bundle (catches the culprit clearly)
const FORBIDDEN = new Set(['http','https','url','fs','path','zlib','stream','crypto','util','net','tls','events']);
const origResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (ctx, name, platform) => {
  if (FORBIDDEN.has(name)) {
    throw new Error(`[mobile] Node builtin "${name}" imported – not supported in React Native/Hermes.`);
  }
  return origResolveRequest
    ? origResolveRequest(ctx, name, platform)
    : require('metro-resolver').resolve(ctx, name, platform);
};

// Avoid duplicate copies in monorepos
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
