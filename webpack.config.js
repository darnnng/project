const { resolve } = require('path');
var path = require('path');
require('dotenv').config();
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app/index.tsx',
  },
  plugins: [
    new EnvironmentPlugin([]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: ['.ts', '.tsx', '.js'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eof|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'icss',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.module\.scss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',

            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        include: [resolve(__dirname, 'src')],
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: resolve(__dirname, 'src/pages/HomePage/assets'),
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.scss', '.json'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@widgets': path.resolve(__dirname, './src/widgets/'),
      '@features': path.resolve(__dirname, './src/features/'),
      '@entities': path.resolve(__dirname, './src/entities/'),
      '@shared': path.resolve(__dirname, './src/shared/'),
      '@public': path.resolve(__dirname, 'public'),
    },
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
  performance: {
    hints: false,
  },
};
