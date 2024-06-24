const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ProvidePlugin, DefinePlugin } = require('webpack')
const dotenv = require('dotenv')

// Load environment variables from .env file
const env = dotenv.config().parsed

// Create an object to store the environment variables
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  entry: './src/index.tsx',

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      publicPath: '/'
    }),

    new ProvidePlugin({
      React: 'react',
      process: 'process/browser'
    }),

    new DefinePlugin(envKeys)
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ['babel-loader', 'ts-loader'],
        exclude: ['/node_modules/']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i,
        type: 'asset/resource',
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Optipng enabled by default
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // WebP options will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@common': path.resolve(__dirname, 'src/common/'),
      '@type': path.resolve(__dirname, 'src/types/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@modules': path.resolve(__dirname, 'src/modules/'),
      '@libs': path.resolve(__dirname, 'src/libs/'),
      '@import': path.resolve(__dirname, 'src/import/'),
      '~': path.resolve(__dirname, 'public'),
      '@mui/material': '@mui/material/legacy',
      '@mui/styled-engine': '@mui/styled-engine/legacy',
      '@mui/system': '@mui/system/legacy',
      '@mui/base': '@mui/base/legacy',
      '@mui/utils': '@mui/utils/legacy',
      '@mui/lab': '@mui/lab/legacy'
    },
    fallback: {
      process: require.resolve('process/browser')
    }
  }
}
