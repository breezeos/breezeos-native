module.exports = {
  extends: "erb",
  plugins: ["@typescript-eslint"],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    "import/no-extraneous-dependencies": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "no-console": "off",
    "import/no-import-module-exports": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "prettier/prettier": "off",
    "no-plusplus": "off",
    "import/prefer-default-export": "off",
    "promise/catch-or-return": "off",
    "promise/always-return": "off",
    "import/no-relative-packages": "off",
    "consistent-return": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "warn",
    "react/button-has-type": "off",
    "react/require-default-props": "off"
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
      webpack: {
        config: require.resolve("./.erb/configs/webpack.config.eslint.ts"),
      },
      typescript: {},
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
};
