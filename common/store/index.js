/* eslint-disable no-underscore-dangle */
import browserHistory from 'react-router/lib/browserHistory'

import configureStore from './configureStore'

const preloadedState = __BROWSER__ ? window.__PRELOADED_STATE__ || {} : {}
const store = configureStore(browserHistory, preloadedState)

export default store
