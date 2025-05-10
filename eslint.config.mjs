import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import next from '@next/eslint-plugin-next';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    ...compat.config({
        extends: [
            'next/core-web-vitals',
            'next/typescript'
        ]
    }),
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                browser: true,
                es2021: true,
                node: true,
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            next
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
            },
        },
        rules: {
            // 格式化規則（替代 Prettier）
            'indent': ['error', 4, { SwitchCase: 1 }],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            'eol-last': ['error', 'always'],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'max-len': ['error', { code: 80, ignoreComments: true, ignoreUrls: true }],
            'linebreak-style': ['error', 'unix'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-infix-ops': 'error',
            'space-before-function-paren': [
                'error',
                { anonymous: 'always', named: 'never', asyncArrow: 'always' },
            ],
            'no-trailing-spaces': 'error',
            'no-empty': ['error', { allowEmptyCatch: true }],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

            // 通用規則
            'eqeqeq': ['error', 'always'],
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-duplicate-imports': 'error',
            'no-unused-expressions': 'error',
            'no-implicit-coercion': 'error',
            'no-shadow': 'error',
            'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
            'no-undef': 'error',

            // TypeScript 規則
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',

            // React 規則
            'react/prop-types': 'off',
            'react/jsx-no-undef': 'error',
            'react/jsx-no-duplicate-props': 'error',
            'react/no-unescaped-entities': 'error',
            'react/no-unknown-property': 'error',
            'react/self-closing-comp': ['error', { component: true, html: true }],
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-key': 'error',
            'react/no-direct-mutation-state': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
            'react/jsx-first-prop-new-line': ['error', 'multiline'],
            'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

            // 無障礙規則（有利於 SEO）
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/no-noninteractive-element-interactions': 'error',
            'jsx-a11y/anchor-is-valid': 'error',
            'jsx-a11y/click-events-have-key-events': 'error',
            'jsx-a11y/no-static-element-interactions': 'error',
            'jsx-a11y/aria-props': 'error',
            'jsx-a11y/aria-unsupported-elements': 'error',

            // 導入規則
            'import/no-unresolved': 'error',
            'import/no-duplicates': 'error',
            "import/no-extraneous-dependencies": ["error", {
                "devDependencies": true,
                "optionalDependencies": false,
                "peerDependencies": false
            }],
            'import/newline-after-import': 'error',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',

            // Next.js 規則
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'error',
            '@next/next/no-sync-scripts': 'error',
            '@next/next/no-unwanted-polyfillio': 'error'
        }
    },
    // JavaScript 文件放寬 TypeScript 規則
    {
        files: ['**/*.js', '**/*.jsx'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    // 測試文件放寬部分規則
    {
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
        },
    }
];

export default eslintConfig;
