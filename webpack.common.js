const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    publicPath: "/fmc-todo-app/",
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      title: "Sdg",
      favicon: path.resolve(__dirname, "./images/favicon-32x32.png"),
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "/images/[name].[ext]",
          },
        },
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot)(\?[a-z0-9]+)?$/,
        loader: "file-loader",
      },
    ],
  },
};
