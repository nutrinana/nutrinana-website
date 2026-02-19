import js from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsdoc from "eslint-plugin-jsdoc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

const eslintConfig = [
    // Ignore patterns
    {
        ignores: ["**/node_modules/**", "**/.next/**", "**/out/**", "**/build/**", "**/dist/**"],
    },

    // Base config for all JS files
    {
        files: ["**/*.{js,jsx,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            prettier: eslintPluginPrettier,
            react: eslintPluginReact,
            "react-hooks": eslintPluginReactHooks,
            import: eslintPluginImport,
        },
        rules: {
            ...js.configs.recommended.rules,
            "prettier/prettier": "error",
            "brace-style": "off",
            curly: ["error", "all"],
            "brace-style": ["error", "1tbs", { allowSingleLine: false }],
            "no-else-return": "error",
            "no-negated-condition": "warn",
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "return" },
            ],
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "object",
                    ],
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before",
                        },
                        {
                            pattern: "src/**",
                            group: "internal",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["react"],
                    alphabetize: { order: "asc", caseInsensitive: true },
                    "newlines-between": "always",
                },
            ],
            // React rules
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },

    // JSDoc rules for specific files
    {
        files: [
            "src/components/**/*.{js,jsx}",
            "src/hooks/**/*.{js,jsx}",
            "src/lib/**/*.{js,jsx}",
            "src/app/api/**/*.{js,jsx}",
        ],
        ignores: ["src/components/ui/**"],
        plugins: {
            jsdoc: eslintPluginJsdoc,
        },
        rules: {
            "jsdoc/require-jsdoc": [
                "error",
                {
                    contexts: [
                        "FunctionDeclaration[id.name=/^[A-Z]/]",
                        "VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/] > FunctionExpression",
                        "FunctionDeclaration[id.name=/^use[A-Z]/]",
                        "VariableDeclaration > VariableDeclarator[id.name=/^use[A-Z]/] > FunctionExpression",
                        "ExportNamedDeclaration > FunctionDeclaration",
                        "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression",
                        "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > FunctionExpression",
                        "ExportDefaultDeclaration > FunctionDeclaration",
                        "ExportDefaultDeclaration > ArrowFunctionExpression",
                        "VariableDeclarator[id.name=/^(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)$/] > ArrowFunctionExpression",
                        "FunctionDeclaration[id.name=/^(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)$/]",
                    ],
                    require: {
                        FunctionDeclaration: true,
                        ArrowFunctionExpression: true,
                        FunctionExpression: true,
                    },
                    exemptEmptyFunctions: true,
                    publicOnly: true,
                    minLineCount: 4,
                },
            ],
            "jsdoc/require-description": "error",
            "jsdoc/match-description": [
                "error",
                {
                    matchDescription: "^[A-Z][\\s\\S]*[.:]\\s*$",
                },
            ],
            "jsdoc/check-tag-names": [
                "error",
                { definedTags: ["component", "hook", "route", "util"] },
            ],
            "jsdoc/newline-after-description": "off",
            "jsdoc/tag-lines": ["error", "any", { startLines: 1, endLines: 1 }],
            "jsdoc/sort-tags": [
                "error",
                {
                    tagSequence: [
                        { tags: ["component", "hook", "route", "util"] },
                        { tags: ["param", "arg", "argument", "prop", "property"] },
                        { tags: ["returns", "return"] },
                        { tags: ["-other"] },
                    ],
                    alphabetizeExtras: false,
                    linesBetween: 1,
                    reportTagGroupSpacing: true,
                    reportIntraTagGroupSpacing: true,
                },
            ],
        },
    },

    // React Email component overrides
    {
        files: ["src/emails/**/*.{js,jsx}", "src/emails/**/*.preview.{js,jsx}"],
        rules: {
            "no-unused-vars": "off",
        },
    },
];

export default eslintConfig;
