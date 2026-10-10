import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig(
  // Ignore generated/dependency directories
  {
    ignores: ['**/node_modules', '**/dist', '**/out']
  },

  // Electron Toolkit TypeScript configuration
  tseslint.configs.recommended,

  // React
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],

  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  {
    files: ['**/*.{ts,tsx}'],

    // React Hooks / Refresh
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },

    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,

      // TypeScript
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Async safety
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Type safety
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',

      // Exhaustiveness
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      // JavaScript
      eqeqeq: 'error',
      'no-constant-condition': 'error',
      'no-debugger': 'error',

      // Logging
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],

      // Variables
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)'
        }
      ]
    }
  },

  // Prettier must come last
  eslintConfigPrettier
)
