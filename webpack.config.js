const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',

  context: process.cwd(),

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },

  entry: {
    app: './themes/storefront/login/src/app/components/index.tsx',
    utils: './themes/storefront/login/src/app/utils/index.ts'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new ExtraneousFileCleanupPlugin({
      extensions: ['.js']
    })
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), 'themes/storefront/login/resources/web_modules'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};