const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const exchange = (method, params) => {
  let api // = project specific api

  // eslint-disable-next-line no-constant-condition
  if (true /* __LOC__ */) {
    api = require('./mocks/api').default
  }

  if (!api) {
    debug('Project api not exist')
    return Promise.reject()
  }

  return new Promise((resolve, reject) => {
    debug('call:', method, params)

    api
      .call(method, params, (result) => {
        if (result.error) {
          reject(result.error)
        }

        debug('response:', method, result)
        return resolve(result)
      })
      .catch(err => reject(err))
  })
}

export default exchange
