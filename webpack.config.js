var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * This is the Webpack configuration file for dev.
 */
module.exports = {
  entry: "./example/index.js",

  output: {
    path: path.resolve("site"),
    filename: "demo.js"
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  }
};
