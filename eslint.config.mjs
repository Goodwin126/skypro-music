import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // 1. Глобальные настройки для всех JS/TS/JSX/TSX файлов
  {
    files: ['**/*.{js,mjs,cjs,jsx,tsx,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    extends: [js.configs.recommended],
  },

  // 2. Настройки для React (обычные компоненты) — теперь применяются ко всем .jsx/.tsx
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { react: pluginReact },
    extends: [pluginReact.configs.flat.recommended],
    rules: {
      'react/jsx-key': 'warn',
      'react/prop-types': 'off',
    },
  },

  // 3. Настройки специально для тестов (Vitest + Jest API)
  {
    files: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { vitest: require('eslint-plugin-vitest') },
    rules: {
      'vitest/valid-title': 'error',
      'vitest/prefer-expect-resolves': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // 4. Prettier (должен идти последним!)
  prettier,
]);
