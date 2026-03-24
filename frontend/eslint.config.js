import js from '@eslint/js';
import tsEslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**']
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  }
];
