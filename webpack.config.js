const path = require('path')

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: { 
          presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  devtool: 'source-map'
}
