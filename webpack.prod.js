const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 200000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 30,
          chunks: 'all',
          reuseExistingChunk: true,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]
            return `vendors.${packageName.replace('@', '')}`
          }
        },
        shareImports: {
          test: /[\\/]import[\\/]/,
          name: 'shareImports',
          priority: 20,
          reuseExistingChunk: true,
          enforce: true
        },
        storage: {
          test: /[\\/]store[\\/]/,
          name: 'storage',
          reuseExistingChunk: true,
          enforce: true
        },
        module_auth: {
          test: /[\\/]modules[\\/]auth/,
          name: 'module_auth',
          reuseExistingChunk: true,
          enforce: true
        },
        shareComponents: {
          test: /[\\/]@core[\\/]components[\\/]/,
          name: 'shareComponents',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 6 }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new BundleAnalyzerPlugin()
  ]
})
