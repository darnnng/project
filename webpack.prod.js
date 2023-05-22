import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import CompressionPlugin from 'compression-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { config } from './webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export default merge(config, {
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
});
