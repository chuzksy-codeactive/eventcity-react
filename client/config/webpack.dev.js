const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackConfig = new htmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html')
});

const config = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../src'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8090/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    port: 8090,
    host: 'localhost',
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: [{
      context: '/api',
      target: 'http://localhost:3001'
    }],
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [htmlWebpackConfig, new webpack.HotModuleReplacementPlugin()],
  stats: {
    colors: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
};

module.exports = config;
