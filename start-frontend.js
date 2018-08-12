/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const frontendCompiler = webpack(webpackConfig);

const { spawn } = require('child_process');

spawn('node', ['./src/server.js'], { stdio: 'inherit' });

const watching = frontendCompiler.watch({
  // Example watchOptions
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  // Print watch/build result here...
  console.log(err);
});
