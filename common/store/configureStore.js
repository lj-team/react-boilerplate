/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux'
import routerMiddleware from 'react-router-redux/lib/middleware'
import thunk from 'redux-thunk'
import dynamicMiddlewares from 'redux-dynamic-middlewares'

import api from 'common/project/api'
import reducer from 'common/reducer'

const configureStore = (history, initialState) => {
  let middlewareList = [
    thunk.withExtraArgument({ api }),
    routerMiddleware(history),
    dynamicMiddlewares,
  ]

  if (__BROWSER__ && __DEV__) {
    const createLogger = require('redux-logger').createLogger
    middlewareList = middlewareList
      .concat(createLogger({
        level: 'info',
        collapsed: true,
      }))
  }

  const middlewares = applyMiddleware(...middlewareList)

  const devTools = __BROWSER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeEnhancers = __DEV__ && devTools ? devTools : compose

  const store = createStore(
    reducer(),
    initialState,
    composeEnhancers(middlewares),
  )

  // if (__BROWSER__ && module.hot) {
  //   module.hot.accept('../reducer', () => {
  //     const nextRootReducer = require('../reducer').default

  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}

export default configureStore
