const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const escapeForRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rootPrefix = escapeForRegExp(__dirname);

config.resolver.blockList = [
  ...(Array.isArray(config.resolver.blockList)
    ? config.resolver.blockList
    : config.resolver.blockList
      ? [config.resolver.blockList]
      : []),
  new RegExp(`^${rootPrefix}[\\\\/]android[\\\\/]`),
  new RegExp(`^${rootPrefix}[\\\\/]\\.expo[\\\\/]`),
];

const dynamicTokens = [
  '--color-paper',
  '--color-surface',
  '--color-surface-2',
  '--color-surface-3',
  '--color-ink',
  '--color-ink-soft',
  '--color-muted',
  '--color-line',
  '--color-warm',
  '--color-warm-ink',
  '--color-control',
  '--color-control-ink',
  '--color-clay',
  '--color-accent',
  '--color-accent-on',
  '--color-danger',
];

module.exports = withNativewind(config, {
  globalClassNamePolyfill: false,
  inlineVariables: {
    exclude: dynamicTokens,
  },
});
