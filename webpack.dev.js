const path = require("path");
const webpack = require("webpack")
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    before: function (app, server) {
      server._watch(["./**/*.js", "./*.html"]);
    },
    contentBase: path.resolve(__dirname),
    compress: true,
    open: true,
    hot: true,
    host: "0.0.0.0",
    port: 3000,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});