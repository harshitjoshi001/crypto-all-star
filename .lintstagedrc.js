const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const typescriptCheckCommand = () => `bash -c tsc`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, typescriptCheckCommand],
};
