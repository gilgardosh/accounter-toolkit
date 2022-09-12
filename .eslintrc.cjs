module.exports = {
  extends: ['@theguild'],
  plugins: ['eslint-plugin-simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
      },
    ],
  },
  ignorePatterns: ['**/dev-tests/', '**/dist/', '**/node_modules/', '.bob/', '**/generated-types/'],
};
