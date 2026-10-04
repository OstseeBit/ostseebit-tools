import antfu from '@antfu/eslint-config';
import autoImport from './.eslintrc-auto-import.json' with { type: 'json' };

const sourceFiles = ['**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}'];

export default antfu(
  {
    typescript: true,
    vue: true,
    unocss: true,
    markdown: false,
  },
  {
    name: 'ostseebit/auto-imports',
    files: sourceFiles,
    languageOptions: {
      globals: autoImport.globals,
    },
  },
  {
    name: 'ostseebit/playwright',
    files: ['**/*.e2e.spec.ts'],
    rules: {
      // Locator.innerText() asserts rendered text; DOM textContent is not equivalent.
      'unicorn/prefer-dom-node-text-content': 'off',
    },
  },
  {
    name: 'ostseebit/rules',
    files: sourceFiles,
    rules: {
      'curly': ['error', 'all'],
      'style/semi': ['error', 'always'],
      'ts/no-use-before-define': ['error', { allowNamedExports: true, functions: false }],
      'vue/no-empty-component-block': ['error'],
      'no-restricted-imports': ['error', {
        paths: [{
          name: '@vueuse/core',
          importNames: ['useClipboard'],
          message: 'Please use local useCopy from src/composable/copy.ts instead of useClipboard.',
        }],
      }],
    },
  },
);