import React from 'react'

import Route from 'react-router/lib/Route'
import IndexRedirect from 'react-router/lib/IndexRedirect'

import App from './container'
import NotFound from './components/NotFound'

import page from './page/route'

let Preview = NotFound
if (__BROWSER__ && __LOC__) {
  Preview = require('./preview').default
}

const routes = () => (
  <Route path="/">
    <Route path="/preview" component={Preview} />
    <Route path="/" component={App}>
      <Route
        path="/first"
        getComponent={page}
      />
      <Route
        path="/second"
        getComponent={page}
      />
      <Route path="/*" component={NotFound} />
    </Route>
    <IndexRedirect to="/first" />
  </Route>
)

export default routes
