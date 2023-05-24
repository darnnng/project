import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import CompressionPlugin from 'compression-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { merge } from 'webpack-merge';
import {
  configureAssetsLoader,
  configureImagesLoader,
  // configureMinimizeCss,
  configureSCSSLoader,
  //configureSCSSmoduleLoader,
  configureStyleLoader,
  configureTSXLoader,
  configureTsLoader,
} from './config/loaders.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { setPluginsPkg } from './config/plugins.js';
import { setResolvers } from './config/resolvers.js';
import { buildDevServer } from './config/buildDevServer.js';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const configureSCSSmoduleLoader = (isProduction) => {
  return {
    test: /\.module\.scss$/i,

    use: [
      {
        loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
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
    sideEffects: true,
  };
};

const webpackConfig = (env) => {
  const isProduction = env === 'production';

  const config = {
    entry: {
      app: path.resolve(dirname, './src/app/index.tsx'),
    },
    plugins: setPluginsPkg(),
    module: {
      rules: [
        configureStyleLoader(isProduction),
        configureTsLoader(),
        configureAssetsLoader(),
        configureSCSSLoader(isProduction),
        configureSCSSmoduleLoader(isProduction),
        configureTSXLoader(),
        configureImagesLoader(),
        // configureMinimizeCss(),
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
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].scss',
        chunkFilename: 'css/[name].[contenthash:8].scss',
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
      assetModuleFilename: '[hash][ext]',
      path: resolve(dirname, './build'),
      publicPath: '/',
      clean: true,
    },
  };

  return isProduction ? merge(config, production) : merge(config, development);
};

export default webpackConfig;
