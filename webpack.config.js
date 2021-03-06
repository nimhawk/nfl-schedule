var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DIST_DIR_PATH = path.join(__dirname, 'dist');
var IS_PROD_MODE = (process.env.NODE_ENV === 'production');

// ensure the `/dist` dir is available
mkdirSync(DIST_DIR_PATH);

var config = {
  context: path.join(__dirname, 'lib'),
  entry: {
    App: ['./components/App/App.js', './components/App/App.scss']
  },
  output: {
    path: path.join(DIST_DIR_PATH, 'bundles'),
    publicPath: '/assets',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        optional: ['runtime']
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass')
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '../images/[name]-[hash].[ext]'
      }
    },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }]
  },
  //this de-dupes any duplicate versions of React
  resolve: {
    modulesDirectories: ['node_modules', 'lib/components'],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  plugins: [
    //new webpack.DefinePlugin({
      //'process.env': {NODE_ENV: JSON.stringify('production')}
    //}),
    new ExtractTextPlugin('[name].css')
  ]
};

if (IS_PROD_MODE) {
  config.output.path = path.join(__dirname, 'dist', '[hash]');

  // further optimization
  config.plugins.unshift(new webpack.optimize.DedupePlugin());

  // write more stats info (like file-sizes)
  config.profile = true;
  config.plugins.push(function () {
    this.plugin('done', function (stats) {
      writeBundleDirectorySync(stats.hash);
      writeStatsSync(stats);
    });
  });
} else {
  config.output.pathinfo = true;
  config.devtool = '#source-map';
  writeBundleDirectorySync('bundles');
}

module.exports = config;

function writeStatsSync(stats) {
  var statsPath = path.join(DIST_DIR_PATH, 'stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats.toJson()));
}

function writeBundleDirectorySync(name) {
  var statsPath = path.join(DIST_DIR_PATH, 'bundleDirectory.json');
  fs.writeFileSync(statsPath, JSON.stringify(name));
}

function mkdirSync(dirPath) {
  try {
    fs.mkdirSync(dirPath);
  } catch(e) {
    if (e.code !== 'EEXIST') throw e;
  }
}
