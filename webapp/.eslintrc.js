module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["import", "jest", "prettier", "react", "react-hooks", "@typescript-eslint", "graphql"],
  rules: {
    "graphql/required-fields": [
      "error",
      {
        env: "apollo",
        schemaJson: require("./src/generated/schema.json"),
        requiredFields: ["id"],
      },
    ],
    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
        schemaJson: require("./src/generated/schema.json"),
        tagName: "gql",
      },
    ],
    "import/newline-after-import": 2,
    "import/no-cycle": 2,
    "import/order": [
      2,
      {
        groups: [["builtin", "external"], ["internal", "parent", "index"], ["sibling"]],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "src/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
      },
    ],
    "prettier/prettier": "error",
    "react/jsx-curly-brace-presence": [2, { props: "never", children: "never" }],
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "react/jsx-sort-props": [2],
    "react/prop-types": [0],
    "react/sort-prop-types": [2],
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/no-unescaped-entities": [0],
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
