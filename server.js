var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');

var port = process.env.port || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  //noInfo: true,
  historyApiFallback: true,
  stats: {chunks:false}
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log(path.resolve(__dirname, 'src'));
  console.log(`Listening at http://localhost:${port}/`);
});
