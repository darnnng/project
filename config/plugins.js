import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import pkg from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
const { EnvironmentPlugin, ProvidePlugin } = pkg;
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const setPluginsPkg = () => {
  return [
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
    new ProvidePlugin({
      process: 'process/browser',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new CssMinimizerPlugin({
      test: /\.css$/i,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(dirname, '../public/locales/en'),
          to: 'locales/en',
        },
        {
          from: path.resolve(dirname, '../public/locales/ru'),
          to: 'locales/ru',
        },
      ],
    }),
  ];
};
