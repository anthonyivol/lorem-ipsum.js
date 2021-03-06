const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const PATHS = {
  SRC: "./src",
  DIST: path.resolve(__dirname),
};

module.exports = {
  entry: {
    "dist/index": `${PATHS.SRC}/index`,
    "dist/bin/lorem-ipsum.bin": `${PATHS.SRC}/bin/lorem-ipsum.bin`,
  },

  mode: "development",

  output: {
    path: PATHS.DIST,
    filename: "[name].js",
    library: "loremIpsum",
    libraryTarget: "umd",
  },

  resolve: {
    extensions: ["!.spec.ts", ".ts", ".tsx", ".js", ".json"],
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin("dist"),
    new webpack.BannerPlugin({
      banner: conf => {
        if (conf.filename === "dist/bin/lorem-ipsum.bin.js") {
          return "#!/usr/bin/env node";
        }
        return "";
      },
      raw: true,
    }),
  ],
  node: {
    child_process: "empty",
    fs: "empty",
  },
};
