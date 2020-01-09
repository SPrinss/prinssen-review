const { DEFAULT_EXTENSIONS } = require('@babel/core');
const { findSupportedBrowsers } = require('@open-wc/building-utils');
const customMinifyCss = require('@open-wc/building-utils/custom-minify-css');
const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const indexHTML = require('rollup-plugin-index-html');
// const cpy = require('rollup-plugin-cpy');

const production = !process.env.ROLLUP_WATCH;
const BUILDFOLDER = 'dist'
/**
 * @typedef {ConfigOptions}
 * @param {*} _options
 * @param {*} legacy
 */

module.exports = function createBasicConfig(_options) {
  const options = {
    outputDir: BUILDFOLDER,
    extensions: DEFAULT_EXTENSIONS,
    indexHTMLPlugin: {},
    ..._options,
  };

  return {
    input: './index.html',
    treeshake: !!production,
    output: {
      dir: options.outputDir,
      format: 'esm',
      sourcemap: true,
      dynamicImportFunction: 'importShim',
    },
    plugins: [
      // parse input index.html as input and feed any modules found to rollup
      indexHTML({
        ...(options.indexHTMLPlugin || {}),
        polyfills: {
          ...((options.indexHTMLPlugin && options.indexHTMLPlugin.polyfills) || {}),
          dynamicImport: true,
          webcomponents: true
        }
        
     }),

    //  Copy files to the build folder that are not impported by modules imported by index.html such as pictures or init scripts.
    //  cpy({
    //     dest: options.outputDir,
    //     options: {
    //       parents: true
    //     },
    //   }),

      // resolve bare import specifiers
      resolve({
        extensions: options.extensions,
      }),

      // run code through babel
      babel({
        extensions: options.extensions,
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
          // rollup rewrites import.meta.url, but makes them point to the file location after bundling
          // we want the location before bundling
          'bundled-import-meta',
          production && [
            'template-html-minifier',
            {
              modules: {
                'lit-html': ['html'],
                'lit-element': ['html', { name: 'css', encapsulation: 'style' }],
              },
              htmlMinifier: {
                collapseWhitespace: true,
                removeComments: true,
                caseSensitive: true,
                minifyCSS: customMinifyCss,
              },
            },
          ],
        ].filter(_ => !!_),

        presets: [
          [
            '@babel/preset-env',
            {
              targets: findSupportedBrowsers(),
              // preset-env compiles template literals for safari 12 due to a small bug which
              // doesn't affect most use cases. for example lit-html handles it: (https://github.com/Polymer/lit-html/issues/575)
              exclude: ['@babel/plugin-transform-template-literals'],
              useBuiltIns: false,
              modules: false,
            },
          ],
        ],
      }),

      // only minify if in production
      production && terser(),
    ],
  };
};
