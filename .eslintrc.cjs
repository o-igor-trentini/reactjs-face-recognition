module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                printWidth: 120,
                trailingComma: 'all',
                arrowParens: 'always',
                endOfLine: 'auto',
            },
        ],
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/parsers': {
            [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
        },
    }
};
