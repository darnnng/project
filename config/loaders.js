import { fileURLToPath } from 'url';
import path, { resolve as _resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const jsonLoader = () => {
  return {
    test: /\.json$/,
    loader: 'file-loader',
    type: 'javascript/auto',
  };
};

export const configureTsLoader = () => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  };
};

export const miniSCSS = () => {
  return {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 2,
        },
      },

      'sass-loader',
    ],
  };
};

export const configureImagesLoader = () => {
  return {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    include: _resolve(dirname, './../src/pages/HomePage/assets'),
    type: 'asset/resource',
  };
};
