import config from 'app-config-chain';
import path from 'path';
import requireDir from 'require-dir';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ExtractCSS } from './loaders/styles'

// get loaders from all dirs and create an array of them
const lFolder = requireDir('./loaders');

// if a loader exports more than just an array
Object.keys(lFolder).forEach(function(key){
  if (!Array.isArray(lFolder[key])) lFolder[key] = lFolder[key].default;
});

const loaders = Object.keys(lFolder).reduce((a,b) => a.concat(lFolder[b]), []);

const globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development', // used in react
  '__PROD__': config.env === 'production' // used in react
}

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: [path.join(config.paths.client, './app.js')]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: config.paths.dist,
    publicPath: config.paths.public
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin(globals),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(config.paths.client, 'assets/html/index.html'),
      hash: false,
      favicon: path.join(config.paths.client, 'assets/images/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    ExtractCSS
  ],
  resolve: {
    root: config.paths.client
  },
  module: {
    preLoaders: [
      {
        test:/\.jsx$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders
  },
  eslint: {}
}

export default webpackConfig;
