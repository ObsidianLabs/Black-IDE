'use strict'

require('dotenv').config()
const path = require('path')

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  plugins: []
}
