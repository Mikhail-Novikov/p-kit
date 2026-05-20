/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{pug}',
    './build/**/*.html',
  ],
  corePlugins: {
    preflight: false
  },
};
