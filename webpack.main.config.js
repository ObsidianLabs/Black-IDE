const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const baseConfig = require('./webpack.base.config')

module.exports = merge.smart(baseConfig, {
  target: 'electron-main',
  entry: {
    index: './src.main/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dev')
  },
  resolve: { mainFields: ['main', 'module'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              { targets: 'maintained node versions' }
            ],
            '@babel/preset-typescript'
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }]
          ]
        }
      },
      {
        test: /pty\.node$/,
        loader: 'native-ext-loader',
        options: {
          basePath: process.env.NODE_ENV === 'production'
            ? ['..', '..', 'node_modules', 'node-pty', 'build', 'Release']
            : ['..', 'node_modules', 'node-pty', 'build', 'Release'],
          emit: false
        }
      },
      {
        test: /\.node$/,
        use: 'native-ext-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'node_modules/@obsidians/eth-project/main/templates',
        to: 'templates'
      },
      {
        from: 'node_modules/@obsidians/eth-network/main/genesis.json',
        to: 'genesis.json'
      },
      {
        from: 'assets/icon.png',
        to: 'icon.png'
      }
    ]),
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src.main/**/*']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.BUILD': JSON.stringify(process.env.BUILD),
      'process.env.PROJECT': JSON.stringify(process.env.PROJECT || process.env.BUILD),
      'process.env.PROJECT_NAME': JSON.stringify(process.env.PROJECT_NAME),
      'process.env.SERVER_URL': JSON.stringify(process.env.REACT_APP_SERVER_URL),
      'process.env.DOCKER_IMAGE_NODE': '"ethereum/client-go"',
      'process.env.DOCKER_IMAGE_COMPILER': '"obsidians/truffle"',
    })
  ]
})
