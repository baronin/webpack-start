const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const PATHS = require('./paths');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development', // process.env.NODE_ENV
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: PATHS.postcss } },
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: PATHS.postcss } },
        },
      ],
    }],
  },
  plugins: [
    // stylelint
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: `${PATHS.src}/scss`,
      files: ['**/*.css', '**/*.scss'],
      failOnError: false,
      syntax: 'scss',
    }),
  ],
});