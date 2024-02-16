module.exports = {
    env: {
        es2021: true,
        node: true,
        jest: true
    },
    extends: [
        "plugin:@stylistic/recommended-extends",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: __dirname
    },
    plugins: [
        "@stylistic",
        "prettier"
    ],
    rules: {
        "prettier/prettier": "error",
        "@stylistic/ts/interface-name-prefix": "off",
        "@stylistic/ts/explicit-function-return-type": "off",
        "@stylistic/ts/explicit-module-boundary-types": "off",
        "@stylistic/ts/no-unused-vars": "off",
        "@stylistic/ts/no-explicit-any": "off",
        "@stylistic/indent": "off",
        "semi": [
            "error",
            "always"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "@stylistic/quotes": [
            "error",
            "double"
        ],
        "@stylistic/semi": [
            "error",
            "always"
        ],
        "@stylistic/arrow-parens": "off",
        "@stylistic/member-delimiter-style": [
            "error",
            {
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@stylistic/brace-style": [
            "error",
            "1tbs"
        ]
    }
}