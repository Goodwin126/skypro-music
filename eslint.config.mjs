import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // 1. Базовые настройки для всего JS (глобальные переменные браузера, базовый линтинг)
  {
    files: ['**/*.{js,mjs,cjs,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    extends: [js.configs.recommended],
  },

  // 2. Специфичные настройки только для React (JSX/TSX)
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { react: pluginReact },
    extends: [pluginReact.configs.flat.recommended],
    rules: {
      'react/jsx-key': 'warn',
      'react/prop-types': 'off',
    },
  },

  prettier,
]);
