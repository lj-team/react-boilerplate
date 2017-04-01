import React from 'react'
import { render } from 'react-dom'
import Provider from 'react-redux/lib/components/Provider'
import Router from 'react-router/lib/Router'
import AppContainer from 'react-hot-loader/lib/AppContainer'

import routes from 'common/routes'

const handler = () => {
  const ssrStyles = document.getElementById('server-side-styles')
  const ssrState = document.getElementById('server-side-state')

  if (ssrStyles) {
    ssrStyles.parentNode.removeChild(ssrStyles)
  }
  if (ssrState) {
    ssrState.parentNode.removeChild(ssrState)
  }
}

const component = (store, history) => (
  <AppContainer>
    <Provider store={store}>
      <Router routes={routes(store)} history={history} />
    </Provider>
  </AppContainer>
)

const root = ({ store, history }) => {
  const place = document.getElementById('content')
  render(
    component(store, history),
    place,
    handler,
  )
}

export default root
