export default [
  {
    ignores: ["node_modules", ".next/"],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      semi: "error",
      "no-unused-vars": "error",
    },
  },
];
