var webpack = require('webpack');
var path = require('path');
var srcPath = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.join(srcPath, 'app.jsx'),

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loader: 'source-map'
      }
    ],
    loaders: [
      {
        loader: 'babel',
        exclude: /(node_modules)/
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url?limit=25000',
        include: path.resolve(__dirname, 'images')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },

  devSever: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    port: 80
  }
};
