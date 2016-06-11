var webpack = require('webpack');
var path = require('path');
var srcPath = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    bundle: path.join(srcPath, 'app.jsx')
  },

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
        loaders: ["style", "css?sourceMap&-restructuring&aggressiveMerging", "autoprefixer", "sass?sourceMap"]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ),
    new webpack.HotModuleReplacementPlugin()
  ]
};
