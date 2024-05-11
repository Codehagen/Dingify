import baseConfig from "@dingify/eslint-config/base";
import nextjsConfig from "@dingify/eslint-config/nextjs";
import reactConfig from "@dingify/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
];
