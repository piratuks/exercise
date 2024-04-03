module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:prettier/recommended', 'standard-with-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.app.json',
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/semi': 'off'
  }
};
