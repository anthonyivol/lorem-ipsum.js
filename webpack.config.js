const path = require("path");
const webpack = require("webpack");

const PATHS = {
  src: "./src",
  dist: path.resolve(__dirname)
};

module.exports = {
  entry: {
    "dist/index": `${PATHS.src}/index`,
    "dist/bin/lorem-ipsum": `${PATHS.src}/bin/lorem-ipsum`
  },
  mode: "development",
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    library: "lorem-ipsum",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ["!.spec.ts", ".ts", ".tsx", ".js", ".json"]
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: conf => {
        if (conf.filename === "dist/bin/lorem-ipsum.js") {
          return "#!/usr/bin/env node";
        }
        return "";
      },
      raw: true
    })
  ]
};
