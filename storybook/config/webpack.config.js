const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const theme = require('../../src/theme');

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, './'),
              },
              sourceMap: true,
            },
          },
          'less-loader?{"sourceMap":true}',
        ],
        exclude: path.resolve(__dirname, '../../node_modules'),
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader'],
        include: [path.resolve(__dirname, '../../node_modules')],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../../'),
      },
    ],
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
};
