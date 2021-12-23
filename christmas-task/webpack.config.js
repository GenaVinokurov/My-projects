const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');


const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.[tj]s$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {},
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },


    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/assets/toys'),
          to: path.resolve(__dirname, 'dist/assets/toys')
        },
        {
          from: path.resolve(__dirname, './src/assets/audio'),
          to: path.resolve(__dirname, 'dist/assets/audio')
        },
        {
          from: path.resolve(__dirname, './src/assets/tree'),
          to: path.resolve(__dirname, 'dist/assets/tree')
        },
        {
          from: path.resolve(__dirname, './src/assets/bg'),
          to: path.resolve(__dirname, 'dist/assets/bg')
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({ extensions: ['ts', 'js'] }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
