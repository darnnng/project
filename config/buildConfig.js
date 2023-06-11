import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { merge } from 'webpack-merge';
import { configureImagesLoader, configureTsLoader, miniSCSS } from './loaders.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { setPluginsPkg } from './plugins.js';
import { setResolvers } from './resolvers.js';
import { buildDevServer } from './buildDevServer.js';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const webpackConfig = (_, env) => {
  const isProduction = env.mode === 'production';

  const config = {
    entry: {
      app: path.resolve(dirname, '../src/app/index.tsx'),
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
    devtool: 'inline-source-map',
    optimization: {
      minimize: true,
    },
    devServer: buildDevServer(),
  };

  const production = {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015',
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
      ],
    },
    output: {
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].[contenthash:8].js',
      assetModuleFilename: '[hash][ext]',
      path: resolve(dirname, './../build'),
      publicPath: '/',
      clean: true,
    },
  };

  return isProduction ? merge(config, production) : merge(config, development);
};

export default webpackConfig;
