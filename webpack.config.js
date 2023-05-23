import { fileURLToPath } from 'url';
import path, { resolve as _resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import pkg from 'webpack';
import {
  configureAssetsLoader,
  configureImagesLoader,
  configureSCSSLoader,
  configureSCSSmoduleLoader,
  configureStyleLoader,
  configureTSXLoader,
  configureTsLoader,
} from './config/loaders.js';

const { EnvironmentPlugin, ProvidePlugin } = pkg;

export const entry = {
  app: './src/app/index.tsx',
};
export const plugins = [
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
export const module = {
  rules: [
    configureStyleLoader(),
    configureTsLoader(),
    configureAssetsLoader(),
    configureSCSSLoader(),
    configureSCSSmoduleLoader(),
    configureTSXLoader(),
    configureImagesLoader(),
  ],
};

export const resolve = {
  symlinks: false,
  extensions: ['.ts', '.tsx', '.js', '.scss', '.json'],
  alias: {
    '@src': _resolve(dirname, 'src/'),
    '@pages': _resolve(dirname, './src/pages/'),
    '@widgets': _resolve(dirname, './src/widgets/'),
    '@features': _resolve(dirname, './src/features/'),
    '@entities': _resolve(dirname, './src/entities/'),
    '@shared': _resolve(dirname, './src/shared/'),
    '@public': _resolve(dirname, 'public'),
  },
};

export const optimization = {
  splitChunks: {
    chunks: 'async',
  },
};
export const performance = {
  hints: false,
};

export const config = {
  entry,
  plugins,
  module,
  resolve,
  optimization,
  performance,
};
