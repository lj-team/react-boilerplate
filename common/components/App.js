import React from 'react'

import injectSheet from 'common/customJss'
import { debounce } from 'common/utils/functions'

const styles = {
  '@global #content': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto',
    boxSizing: 'border-box',
    ie: {
      minHeight: '100vh',
    },
  },
  footer: {
    height: 1,
    backgroundColor: 'gray',
    flex: 'none',
  },
}

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleDocumentResize = debounce(this.setSize, 300).bind(this)
  }

  componentDidMount() {
    this.setSize()
    window.addEventListener('resize', this.handleDocumentResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleDocumentResize, false)
  }

  setSize() {
    this.props.actions.setSize(this.appEl.offsetWidth, this.appEl.offsetHeight)
  }

  render() {
    const {
      sheet: { classes },
      body,
      children,
    } = this.props

    return (
      <div
        className={classes.root}
        ref={el => { this.appEl = el }}
      >
        { body }
        { children }
        <footer
          className={classes.footer}
        />
      </div>
    )
  }
}

export default injectSheet(styles)(App)
