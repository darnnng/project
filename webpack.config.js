import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import CompressionPlugin from 'compression-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { merge } from 'webpack-merge';
import {
  configureAssetsLoader,
  configureImagesLoader,
  configureSCSSLoader,
  configureSCSSmoduleLoader,
  configureStyleLoader,
  configureTSXLoader,
  configureTsLoader,
} from './config/loaders.js';
import { setPluginsPkg } from './config/plugins.js';
import { setResolvers } from './config/resolvers.js';
import { buildDevServer } from './config/buildDevServer.js';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const webpackConfig = (env) => {
  const isProduction = env === 'production';

  const config = {
    entry: {
      app: path.resolve(dirname, './src/app/index.tsx'),
    },
    plugins: setPluginsPkg(),
    module: {
      rules: [
        configureStyleLoader(),
        configureTsLoader(),
        configureAssetsLoader(),
        configureSCSSLoader(),
        configureSCSSmoduleLoader(),
        configureTSXLoader(),
        configureImagesLoader(),
      ],
    },
    resolve: setResolvers(),
    optimization: {
      splitChunks: {
        chunks: 'async',
      },
    },
    performance: {
      hints: false,
    },
  };

  const development = {
    mode: 'development',
    devtool: 'eval-source-map',
    optimization: {
      minimize: false,
    },
    devServer: buildDevServer(),
    output: {
      publicPath: '/',
    },
  };

  const production = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015',
        }),
      ],
    },
    output: {
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
      assetModuleFilename: 'assets/[hash][ext]',
      path: resolve(dirname, './build'),
      publicPath: '/',
      clean: true,
    },
  };

  return isProduction ? merge(config, production) : merge(config, development);
};

export default webpackConfig;
