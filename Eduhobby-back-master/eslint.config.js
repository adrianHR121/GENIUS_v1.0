import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
    {
        plugins: {
            '@stylistic/js': stylisticJs
        },
        rules: {
            "prefer-const": "error",
            "semi": ["error", "always"],
            '@stylistic/js/indent': ['error', 4],
            '@stylistic/js/operator-linebreak': ['error', 'after'],
            '@stylistic/js/no-trailing-spaces': ['error', { "skipBlankLines": true}],
        },
        files: [
            '**/*.js',
            '**/**/*.js'
        ]
    }
];