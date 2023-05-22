import { fileURLToPath } from 'url';
import path, { resolve as _resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import pkg from 'webpack';

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
