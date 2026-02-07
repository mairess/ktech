import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import js from '@eslint/js';

export default [
    js.configs.recommended,

    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['node_modules', 'dist', 'build', '.env'],

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettierPlugin,
        },

        rules: {
            ...tseslint.configs.recommended.rules,
            ...prettierPlugin.configs.recommended.rules,

            'prettier/prettier': 'error',

            'no-console': 'warn',
            'no-debugger': 'error',
            'no-undef': 'off',
            'no-unreachable': 'error',
            'require-await': 'error',
            'curly': ['error', 'all'],
            'eqeqeq': ['error', 'always'],
            'no-implicit-coercion': 'error',
            'no-multi-spaces': 'error',
            'prefer-const': 'error',
            'no-return-await': 'error',
            'no-throw-literal': 'error',

            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' },
            ],
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
        },
    },
];
