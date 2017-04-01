import { addMiddleware, resetMiddlewares } from 'redux-dynamic-middlewares'

import store from 'common/store'
import reducer from 'common/reducer'

export default (nextState, cb) => {
  if (__BROWSER__) {
    require.ensure([], require => {
      // eslint-disable-next-line import/no-dynamic-require
      const component = require('./').default

      resetMiddlewares()
      addMiddleware(component.middleware)
      store.replaceReducer(reducer({ page: component.reducer }))
      store.dispatch(
        component.actions.init(
          nextState.location.query
        )
      )
      cb(null, component.container)
    }, 'post')
  } else {
    // eslint-disable-next-line import/no-dynamic-require
    const component = require('./').default
    store.replaceReducer(reducer({ page: component.reducer }))
    cb(null, { ...component.container })
  }
}
