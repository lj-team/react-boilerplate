/* eslint-disable no-underscore-dangle */
const NODE_ENV = process.env.NODE_ENV || 'local'

global.__BROWSER__ = false
global.__DEV__ = NODE_ENV !== 'production'
global.__LOC__ = NODE_ENV === 'local'

global.__PROJECT__ = 'react-boilerplate'

require('babel-polyfill')
require('babel-register')({
  plugins: [
    'babel-plugin-transform-es2015-modules-commonjs',
  ],
  ignore: /node_modules(?!\/a-module-which-you-have-to-build\/es6)/,
})

require('./server')
