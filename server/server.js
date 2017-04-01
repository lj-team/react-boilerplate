/* eslint-disable global-require */
import path from 'path'
import Express from 'express'
import qs from 'qs' // eslint-disable-line

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const SSR = process.env.SSR

let handler
if (SSR) {
  handler = require('./render').default
} else {
  const tmpl = require('./template').default
  handler = (req, res) => { res.send(tmpl()) }
}

const app = new Express()
const port = 8080

if (process.env.NODE_ENV === 'production') {
  app.use('/', Express.static(path.join(__dirname, '..', 'dist')))
} else {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware') // eslint-disable-line
  const webpackHotMiddleware = require('webpack-hot-middleware') // eslint-disable-line
  const webpackConfig = require('../webpack.config')

  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    color: true,
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(handler)

app.listen(port, error => {
  if (error) {
    debug('HTTP listen error', error)
  } else {
    debug(`HTTP listen on port:${port}`)
  }
})
