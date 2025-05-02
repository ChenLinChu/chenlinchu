import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const eslintConfig = [
    ...compat.extends(
        'next/core-web-vitals', 'next/typescript'
    ),
    {
        rules: {
            // common
            'semi': 1,
            'quotes': [2, 'single'],
            'indent': [2, 4, { SwitchCase: 1 }],
            'eol-last': [2, 'always'],
            'semi-spacing': 1,
            'arrow-spacing': 1,
            'padded-blocks': [2, 'never'],
            'comma-spacing': 1,
            'global-require': 0,
            'no-unused-vars': 1,
            'keyword-spacing': 1,
            'space-infix-ops': 1,
            'arrow-body-style': 2,
            'object-curly-spacing': [2, 'always', { 'objectsInObjects': true }],
            'array-bracket-spacing': 1,
            'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 0 }],
            'space-before-function-paren': [1, {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }],
            'comma-dangle': [2, 'never'],
            'max-len': 0,
            'no-alert': 0,
            'no-new': 0,
            'object-curly-newline': 0,
            'no-restricted-globals': 0,
            'no-underscore-dangle': [0, { allowAfterThis: true }],
            'camelcase': 0,
            'prefer-arrow-callback': 0,
            'func-names': 0,
            'prefer-regex-literals': 0,
            'no-mixed-operators': 0,
            'no-continue': 0,
            'linebreak-style': 0,
            'object-shorthand': 0,
            'no-nested-ternary': 0,

            // import
            'import/extensions': [2, 'ignorePackages', { js: 'always', vue: 'always', ts: 'never' }],
            'import/no-dynamic-require': 0,
            'import/newline-after-import': 2,
            'import/prefer-default-export': 1,
            'import/no-extraneous-dependencies': [2, { optionalDependencies: ['test/unit/index.js'] }]
        }
    }
];

export default eslintConfig;
