export default {
  projectName: 'PerCo',
  ignoredBlocks: [
    // 'no-js',
  ],
  alwaysAddBlocks: [],
  addStyle: [
    'src/styles/tailwind.scss',
    'src/styles/variables.scss',
    'src/styles/mixins.scss',
    'src/styles/keyframes.scss',
    'src/styles/functions.scss',
    'src/styles/vendor.scss',
    'src/styles/global.scss',
    'src/styles/fonts.scss',
    'src/styles/cases.scss',
  ],
  addJsBefore: [
    // './utils/some.js',
    // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  addJsAfter: ['./index.js'],
  addAssets: {
    'src/assets/fonts/**/*.{woff,woff2}': 'fonts/',
    'src/assets/favicons/**/*.{png,ico,svg,xml,webmanifest}': 'favicons/',
    // 'node_modules/somePackage/images/**': 'images/',
  },
};
