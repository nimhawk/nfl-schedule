/* eslint no-console:0 */

var nodemon = require('nodemon');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var nodemonServer = nodemon({
  script: 'server.js',
  ext: 'js',
  watch: [
    'server.js',
    'lib/*'
  ],
  env: {PORT: 4500},
  verbose: true
});

nodemonServer.on('log', function (log) {
  console.log(log.colour);
});

var compiler = webpack(config);

compiler.plugin('invalid', function () {
  nodemonServer.restart();
});

var webpackServer = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  proxy: {'*': 'http://localhost:4500'},
  stats: false
});

var port = 5000;
webpackServer.listen(port, function (err) {
  if (err) console.error(err);
  else console.log('webpack dev server listening at localhost:%s', port);
});
