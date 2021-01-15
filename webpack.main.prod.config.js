const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.main.config')

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build', 'main')
  }
})
