const path = require('path')

const PATHS = {
  src: './src',
  dist: path.resolve(__dirname, 'dist'),
}

module.exports = {
  entry: `${PATHS.src}/index`,
  output: {
    path: PATHS.dist,
    filename: 'index.js',
    library: 'lorem-ipsum',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['!.spec.ts', '.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [{
      test: /\.(tsx?)|(js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
}
