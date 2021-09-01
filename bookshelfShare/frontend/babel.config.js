module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: ['BOOKSS_API'],
        safe: false,
        allowUndefined: true
      }
    ]
  ]
};
