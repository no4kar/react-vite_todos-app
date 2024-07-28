module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-console': 'warn',
    'no-param-reassign': 'warn',
    '@typescript-eslint/no-namespace': 'warn',
    'max-len': ['warn', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
