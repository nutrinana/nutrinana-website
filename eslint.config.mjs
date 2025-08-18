import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginJsdoc from "eslint-plugin-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "prettier"),
    {
        plugins: { prettier: eslintPluginPrettier },
        rules: {
            "prettier/prettier": "error",
            "brace-style": "off",
        },
    },
    {
        rules: {
            curly: ["error", "all"],
            "brace-style": ["error", "1tbs", { allowSingleLine: false }],
            "no-else-return": "error",
            "no-negated-condition": "warn",
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "return" },
            ],
        },
    },
    {
        plugins: { jsdoc: eslintPluginJsdoc },
        files: [
            "src/components/**/*.{js,jsx,ts,tsx}",
            "src/hooks/**",
            "src/lib/**",
            "src/app/api/**",
        ],
        ignores: ["src/components/ui/**"],
        rules: {
            "jsdoc/require-jsdoc": [
                "error",
                {
                    // Only require JSDoc when these selector contexts match
                    contexts: [
                        // React components (PascalCase)
                        "FunctionDeclaration[id.name=/^[A-Z]/]",
                        "VariableDeclaration > VariableDeclarator[id.name=/^[A-Z]/] > FunctionExpression",

                        // Hooks (useXxx)
                        "FunctionDeclaration[id.name=/^use[A-Z]/]",
                        "VariableDeclaration > VariableDeclarator[id.name=/^use[A-Z]/] > FunctionExpression",

                        // Exported utilities (named or default exports)
                        "ExportNamedDeclaration > FunctionDeclaration",
                        "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > ArrowFunctionExpression",
                        "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > FunctionExpression",
                        "ExportDefaultDeclaration > FunctionDeclaration",
                        "ExportDefaultDeclaration > ArrowFunctionExpression",

                        // Next.js API route handlers (GET/POST/etc.)
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
                    // Optional: don't require for very short bodies
                    minLineCount: 4,
                },
            ],
            "jsdoc/require-description": "error",
            "jsdoc/require-description-complete-sentence": "error",
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
];

export default eslintConfig;
