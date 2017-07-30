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
    filename: "react-deck.js"
  },
  plugins: [
    new ExtractTextPlugin("styles-[hash].css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
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
    loaders: [
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
        loader:
          "style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]"
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  }
};
