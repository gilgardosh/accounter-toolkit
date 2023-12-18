module.exports = {
  extends: ['@theguild'],
  plugins: [],
  parserOptions: {
    project: ['tsconfig.json'],
  },
  rules: {
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
      },
    ],
  },
  ignorePatterns: [
    '**/dev-tests/',
    '**/dist/',
    '**/node_modules/',
    '.bob/',
    '**/generated-types/',
    '.changeset/*.md',
    '*/**/.mesh/',
    '*/**/mesh-artifacts/',
    '.eslintrc.cjs',
    'prettier.config.cjs',
    'helpers/*',
  ],
};
