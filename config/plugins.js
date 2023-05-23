import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import pkg from 'webpack';

const { EnvironmentPlugin, ProvidePlugin } = pkg;

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
  ];
};
//rest websockets отличие
//хранилища в браузере local и тд
