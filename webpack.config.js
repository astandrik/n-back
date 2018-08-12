var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/index.js",
  mode: 'development',
  watch: true,
  output: {
    path: __dirname + "/build",
    filename: "index.min.js"
  }
};
