/* eslint-disable import/no-dynamic-require */
import React from 'react'

import injectSheet from 'common/customJss'

const debug = require('debug')('frontend:common:components:Icons:tests')

const styles = {
  root: {
    margin: 20,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    height: 24,

    '& > svg': {
      height: 24,
    },
    '& > span': {
      marginLeft: 20,
    },
  },
}

const context = require.context('../', false)
const comps = context.keys()
  .filter(path => path.match(/^\.\/[a-zA-Z0-9-_]*.js$/))
  .map(path => path.slice(2))
  .filter(path => path !== 'Logo.js')
  .map(path => {
    let component
    try {
      component = require(`common/components/Icons/${path}`).default
    } catch (e) {
      debug('require error', e)
      component = (<span />)
    }

    return { path, component }
  })

const Index = ({
  sheet: { classes },
}) => {
  debug('Icons:', comps)
  return (
    <div className={classes.root} >
      { comps.map(comp => (
        <div key={comp.path} className={classes.icon} >
          <comp.component />
          <span>
            { `common/components/Icons/${comp.path}` }
          </span>
        </div>
      )) }
    </div>
  )
}

export default injectSheet(styles)(Index)
