const path = require('path')
const webpack = require('webpack')

const project = 'react-boilerplate'

const str = val => JSON.stringify(val)
const NODE_ENV = process.env.NODE_ENV || 'local'
const env = {
  loc: NODE_ENV === 'local',
  dev: NODE_ENV === 'development',
  stag: NODE_ENV === 'staging',
  prod: NODE_ENV === 'production',
}

module.exports = {
  devtool: !env.prod ? 'eval' : 'source-map',
  entry: {
    core:
      !env.loc ?
      [
        './client/index.js',
      ] :
      [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './client/index.js',
      ],
  },
  watch: env.dev,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js?v=[hash]',
    chunkFilename: '[name].js?v=[hash]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules(?!\/a-module-which-you-have-to-build\/es6)/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: !env.prod ?
              '[path][name].[ext]' :
              'img-[hash:6].[ext]',
          },
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      common: path.join(__dirname, 'common'),
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'core',
    }),
    new webpack.IgnorePlugin(/\.(test.js|test|md)$/),
    new webpack.DefinePlugin({
      'process.env': {
        API_HOST: str(process.env.API_HOST),
        NODE_ENV: str(NODE_ENV),
      },
      __BROWSER__: str(true),
      __DEV__: str(!env.prod),
      __LOC__: str(env.loc),
      __PROJECT__: str(project),
    }),
  ].concat(env.loc ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ] : []).concat(env.prod ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        drop_console: true,
        warnings: false,
      },
    }),
  ] : []),
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
}
