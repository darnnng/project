import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import { config } from './webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export default merge(config, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
  },
  devServer: {
    port: process.env.PORT,
    static: join(dirname, 'public'),
    hot: true,
    open: true,
    liveReload: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  output: {
    publicPath: '/',
  },
});
