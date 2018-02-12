const path = require('path')

const PATHS = {
  src: './src',
  dist: path.resolve(__dirname),
}

module.exports = {
  entry: {
    'dist/index': `${PATHS.src}/index`,
    'bin/lorem-ipsum': `${PATHS.src}/bin/lorem-ipsum`
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    library: 'lorem-ipsum',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['!.spec.ts', '.ts', '.tsx', '.js', '.json'],
  },
  target: 'node',
  module: {
    rules: [{
      test: /\.(tsx?)|(js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
}
