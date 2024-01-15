module.exports = {
  root: true,
  extends: [
    '@dwp/eslint-config-base',
    'plugin:sonarjs/recommended',
  ],
  env: {
    node: true,
  },
  plugins: [
    'sonarjs',
  ],
  rules: {
    indent: [2, 2],
    'sonarjs/cognitive-complexity': [1, 10],
  },
  parserOptions: {
    ecmaVersion: 12,
  },
};
