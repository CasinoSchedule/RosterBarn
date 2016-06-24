import webpack from 'webpack'
import { compose } from 'compose-middleware'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../../../build/webpack'

const bundler = webpack(webpackConfig)

export default compose([
  WebpackDevMiddleware(bundler, webpackConfig.devServer),
  WebpackHotMiddleware(bundler)
])
