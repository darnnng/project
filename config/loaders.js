import { fileURLToPath } from 'url';
import path, { resolve as _resolve } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const configureTsLoader = () => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader',
  };
};

export const configureAssetsLoader = () => {
  return {
    test: /\.(woff|woff2|eof|ttf|otf)$/i,
    type: 'asset/resource',
  };
};

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

export const configureTSXLoader = () => {
  return {
    test: /\.tsx?$/,
    loader: 'esbuild-loader',
    include: [_resolve(dirname, 'src')],
    exclude: /node_modules/,
    options: {
      loader: 'tsx',
      target: 'es2015',
    },
  };
};

export const configureImagesLoader = () => {
  return {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    include: _resolve(dirname, './../src/pages/HomePage/assets'),
    type: 'asset/resource',
  };
};
