import { fileURLToPath } from 'url';
import path, { resolve as _resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const loaders = {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },

    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: 'ts-loader',
    },

    {
      test: /\.(woff|woff2|eof|ttf|otf)$/i,
      type: 'asset/resource',
    },
    {
      test: /\.scss$/i,
      exclude: /\.module\.scss$/i,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              mode: 'icss',
            },
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    },
    {
      test: /\.module\.scss$/i,
      use: [
        {
          loader: 'style-loader',
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
    },
    // {
    //   test: /\.(js|jsx)$/,
    //   exclude: /node_modules/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //       presets: ['@babel/preset-react'],
    //     },
    //   },
    // },
    {
      test: /\.tsx?$/,
      loader: 'esbuild-loader',
      include: [_resolve(dirname, 'src')],
      exclude: /node_modules/,
      options: {
        loader: 'tsx',
        target: 'es2015',
      },
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      include: _resolve(dirname, 'src/pages/HomePage/assets'),
      type: 'asset/resource',
    },
  ],
};
