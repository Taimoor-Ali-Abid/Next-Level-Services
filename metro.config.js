const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const svgConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
  };
  return mergeConfig(defaultConfig, svgConfig);
})();
