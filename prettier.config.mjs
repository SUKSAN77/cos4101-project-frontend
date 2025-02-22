/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
// import eslintConfigPrettier from "eslint-config-prettier";

const config = {
    trailingComma: "all",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
