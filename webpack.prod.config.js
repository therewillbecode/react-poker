var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/Deck.js",

  output: {
    library: "react-deck",
    libraryTarget: "umd",
    path: __dirname + "/dist/",
    filename: "react-poker.js"
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  externals: [
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
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
