import syncHistoryWithStore from 'react-router-redux/lib/sync'
import browserHistory from 'react-router/lib/browserHistory'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const exec = () => {
  const store = require('common/store').default
  const root = require('./Root').default

  if (!__LOC__) {
    // eslint-disable-next-line
    __webpack_public_path__ = `http://your.specific.static.domain/specific-path/`
  }

  const history = syncHistoryWithStore(
    browserHistory,
    store,
  )

  debug('Root loaded')
  root({ store, history })

  if (__LOC__ && module.hot) {
    module.hot.accept('./Root', () => {
      const nextRoot = require('./Root').default

      debug('NextRoot loaded')
      nextRoot({ store, history })
    })
  }
}

// if you haven't to wait for another, code you can to call `exec` instead next lines

if (document.readyState === 'complete') {
  exec()
} else {
  document.addEventListener('DOMContentLoaded', exec)
}
