const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const theme = require('../../src/theme');

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, '../../'),
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../../'),
      },
      {
        test: /\.module\.less$/,
        loader: [
          'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
          'postcss!',
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`,
        ],
      },
    ],
  },
  plugins: [new FriendlyErrorsWebpackPlugin()],
};
