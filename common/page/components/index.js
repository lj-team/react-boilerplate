import React from 'react'

import injectSheet from 'common/customJss'

const styles = {
  root: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    position: 'relative',
    boxSizing: 'border-box',
    margin: [36, 'auto', 20],
    width: '100%',
    minHeight: 600,
    overflow: 'hidden',
  },
}

class Index extends React.PureComponent {

  render() {
    const {
      sheet: { classes },
    } = this.props

    return (
      <div
        className={classes.root}
      >
        Page
      </div>
    )
  }
}

export default injectSheet(styles)(Index)
