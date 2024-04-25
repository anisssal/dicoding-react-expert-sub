module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        "airbnb",
        "prettier",
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
    settings: {
        react: {
            version: '18.2',
        }
    },
    plugins: ['react-refresh', 'prettier'],
    rules: {
        'react/jsx-no-target-blank': 'off',
        'react/forbid-prop-type': 'off',
        "import/prefer-default-export": "off",
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state',
            ]
        }],
        "no-unused-vars": ["error", {"argsIgnorePattern": "^_"}],
        'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
        "no-underscore-dangle": "off",
        "prefer-spread": "off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },
};
