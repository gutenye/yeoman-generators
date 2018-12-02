const path = require('path')
const Preact = require('craco-preact')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
const WebpackBar = require('webpackbar')
const Antd = require('craco-antd')

module.exports = {
  plugins: [
    { plugin: Antd },
    // { plugin: Preact },
  ],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      gureact: path.resolve(__dirname, 'src/gureact'),
    },
    plugins: [
      // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
      new WebpackBar({ profile: true }),
    ],
  },
}
