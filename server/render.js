import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { SheetsRegistryProvider, SheetsRegistry } from 'react-jss'

import routes from 'common/routes'
import store from 'common/store'

import template from './template'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const render = (req, res) => {
  debug(`Render called on ${req.url} with`)

  match({ routes: routes(store), location: req.url }, (err, redirect, props) => {
    if (err) {
      debug('Error', err.message)
      res.status(500).send(err.message)
      return
    }

    if (redirect) {
      debug(`Redirect to ${redirect.pathname + redirect.search}`)
      res.redirect(redirect.pathname + redirect.search)
      return
    }

    if (!props) {
      debug('Not found')
      res.status(404).send('Not found')
      return
    }

    let html
    let css
    let stateData = '{}'

    try {
      debug('Try to render')
      const sheets = new SheetsRegistry()

      html = renderToString(
        <SheetsRegistryProvider registry={sheets} >
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        </SheetsRegistryProvider>
      )
      css = sheets.toString()
      stateData = JSON.stringify(store.getState())
    } catch (renderError) {
      debug('render to string error', renderError)
    }

    const state = `window.__PRELOADED_STATE__ = ${stateData.replace(/</g, '\\x3c')}`

    const sl = txt => `${txt.slice(0, 10)}...`
    debug('Sent', sl(css), sl(html), sl(state))
    res.send(template({ css, html, state }))
  })
}

export default render
