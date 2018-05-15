'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const multiHelper = require('./multi-helper')

const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    // 右边的3*3主区域
    'main': './src/pages/main/main.js',
    // 园区安防
    'garden-security': './src/pages/garden-security/main.js',
    // 人员统计
    'person-statistics': './src/pages/person-statistics/main.js',
    // 车辆统计
    'car-statistics': './src/pages/car-statistics/main.js',
  },
  // entry:  multiHelper.getEntry(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // plugins: multiHelper.generateTemplate(),
  plugins: [
    // 右边3X3主页面
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './src/pages/main/index.html',
      inject: true,
      chunks: ['main', "vendor", "manifest"]
    }),
    // 园区安防
    new HtmlWebpackPlugin({
      filename: 'garden-security.html',
      template: './src/pages/garden-security/index.html',
      inject: true,
      chunks: ['garden-security', "vendor", "manifest"]
    }),
    // 人员统计
    new HtmlWebpackPlugin({
      filename: 'person-statistics.html',
      template: './src/pages/person-statistics/index.html',
      inject: true,
      chunks: ['person-statistics', "vendor", "manifest"]
    }),
    // 车辆统计
    new HtmlWebpackPlugin({
      filename: 'car-statistics.html',
      template: './src/pages/car-statistics/index.html',
      inject: true,
      chunks: ['car-statistics', "vendor", "manifest"]
    }),
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
