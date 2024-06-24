const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack.dev')
const path = require('path')
const { CSP } = require('../webpack/config')

const options = {
  open: true,
  hot: true,
  compress: true,
  port: 9000,
  historyApiFallback: true,
  host: '0.0.0.0',
  allowedHosts: 'all',
  static: {
    directory: path.join(__dirname, '../public')
  },
  devMiddleware: {
    stats: 'minimal'
  },
  headers: {
    'Content-Security-Policy': CSP
  }
}

const compiler = webpack(config)
const server = new WebpackDevServer(options, compiler)

server.startCallback(() => {
  console.log('Starting server on http://localhost:9000')
})
