module.exports = {
  extends: ['@theguild'],
  plugins: ['eslint-plugin-simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  ignorePatterns: ['**/dev-tests/'],
};
