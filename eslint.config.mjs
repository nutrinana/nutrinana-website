import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";

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
];

export default eslintConfig;
