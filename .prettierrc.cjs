"use strict";

module.exports = {
  plugins: ["@prettier/plugin-pug"],
  trailingComma: "all",
  overrides: [
    {
      files: ["*.html", "*.pug", "*.scss", "*.css"],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ["*.js"],
      options: {
        singleQuote: true,
      },
    },
  ],
};
