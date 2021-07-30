const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    'main':  './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  devServer: {
    proxy: {
      '**': {
        target: 'http://message-list.appspot.com'
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    port: 3000,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    hotOnly: true
  },
  devtool: 'source-map',
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.css|.scss$/i,
        use: ['style-loader', 'css-loader','sass-loader'],
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: "./index.html",
      filename: "./index.html"
    }),
  ],
};