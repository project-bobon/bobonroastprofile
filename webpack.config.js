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
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['node_modules', 'bower_components']
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
        exclude: /(node_modules|bower_components)/
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

  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    )
  ],

  devSever: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    port: 80
  }
};
