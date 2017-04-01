// import someData from './some-data'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const api = {
  call(method, params = {}, _cb) {
    const cb = val => {
      setTimeout(() => {
        _cb(val)
      }, (Math.random() + 1) * 750)
      return { catch: () => {} }
    }

    switch (method) {
      case 'data.set':
        debug('data.set: \n', JSON.stringify(params, null, 2))
        return cb({})
      case 'data.get':
        debug('data.get')
        return cb({}, /* someData */)
      default:
        return cb({})
    }
  },
}

export default api
