module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/setup-tests.js'
  ],
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/?!(react-navigation-shared-element)'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ]
};
