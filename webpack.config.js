import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import CompressionPlugin from 'compression-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { merge } from 'webpack-merge';
import { configureImagesLoader, configureTsLoader, miniSCSS } from './config/loaders.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
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
      rules: [configureTsLoader(), configureImagesLoader(), miniSCSS()],
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
        new MiniCssExtractPlugin({
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
      ],
    },
    output: {
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
      assetModuleFilename: '[hash][ext]',
      path: resolve(dirname, './build'),
      publicPath: '/',
      clean: true,
    },
  };

  return isProduction ? merge(config, production) : merge(config, development);
};

export default webpackConfig;
