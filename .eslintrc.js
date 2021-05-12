module.exports = {
  root: true,
  extends: ['@dwp/eslint-config-base', 'plugin:sonarjs/recommended'],
  plugins: [
    'sonarjs',
  ],
  rules: {
    'sonarjs/cognitive-complexity': [1, 10],
    'jsdoc/require-description-complete-sentence': ['warn'],
  },
  parserOptions: {
    ecmaVersion: '2018',
  },
  ignorePatterns: ['test/**/*'],
};
