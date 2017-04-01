/* eslint-disable import/no-dynamic-require */
import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import injectSheet from 'common/customJss'
import NotFound from 'common/components/NotFound'
import IconClose from 'common/components/Icons/Close'
import PinnedIcon from 'common/components/Icons/PinnedIcon'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const styles = {
  '@global #content': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  root: {
    overflowX: 'hidden',
    flexGrow: 1,
  },
  show: {
    composes: '$root',
  },
  panel: {
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    bottom: 0,
    left: -450,
    width: 450,
    boxSizing: 'border-box',
    padding: 20,
    borderRight: '1px solid lightgray',
    backgroundColor: '#F9F9F9',
    transition: 'left .5s',
    '$show &': {
      left: 0,
    },
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: -20,
      bottom: 0,
      width: 20,
    },
  },
  inputWrapper: {
    position: 'relative',
  },
  inputClear: {
    position: 'absolute',
    top: 11,
    right: 35,
    padding: 0,
    border: 0,
    background: 'none',
    fontSize: 0,
    cursor: 'pointer',
    '& .svgicon': {
      fill: '#a9a9a9',
    },
  },
  showLock: {
    composes: '$inputClear',
    top: 9,
    right: 10,
  },
  showLockOn: {
    composes: '$showLock',
    '& .svgicon': {
      fill: 'red',
    },
  },
  input: {
    width: '100%',
    height: 34,
    boxSizing: 'border-box',
    padding: [0, 30, 0, 6],
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    width: '100%',
    height: 'calc(100% - 34px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxSizing: 'border-box',
    border: '1px solid lightgray',
    borderTop: 0,
    backgroundColor: '#FFF',
  },
  link: {
    position: 'relative',
    display: 'block',
    padding: [0, 8, 1],
    wordBreak: 'break-word',
    transition: 'padding .2s',
    lineHeight: 1.5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      backgroundColor: '#eee',
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: 9,
      width: 6,
      height: 6,
      marginTop: -3,
      borderRadius: '50%',
      backgroundColor: '#00A2D8',
      opacity: 0,
      transition: 'opacity .2s .1s',
    },
  },
  active: {
    composes: '$link',
    fontWeight: 700,
    paddingLeft: 22,

    '&:before': {
      opacity: 1,
    },
    '&:hover:before': {
      backgroundColor: '#00C0FF',
    },
  },
  target: {
    boxSizing: 'border-box',
    width: '100%',
    transition: 'margin .5s',
    '$show &': {
      marginLeft: 450,
    },
  },
}

const provider = state => ({
  query: state.routing.locationBeforeTransitions.query,
})

const context = require.context('common', true, /.*\/preview\/[a-zA-Z0-9-_]*.js$/)
// I can understand why require.context isn't filtered by regexp
const contextKeys = context.keys()
  .filter(path => path.match(/.*\/preview\/[a-zA-Z0-9-_]*.js$/))

debug('All founded tests modules:', contextKeys)

const fuzzySearch = (source, target) => {
  if (!target || !source) {
    return true
  }

  const str = source
    .toLowerCase()
    // clean
    .replace(/\//g, '')
    .replace(/components/g, '')
    .replace(/preview/g, '')
    .replace(/index/g, '')
    .split('')
  const lts = target.toLowerCase().split('')

  return !!lts
    .reduce((bd, l) => {
      const r = bd.indexOf(l)
      return r < 0 ? [] : bd.slice(r + 1)
    }, str)
    .length
}

class Preview extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLock: false,
      showList: !props.query.component,
      search: '',
    }
    this.setter = this.setter.bind(this)
  }

  setter(field, value) {
    this.setState({
      [field]: value,
    })
  }

  render() {
    const {
      sheet: { classes },
      query = {},
    } = this.props
    const {
      showList,
      search,
    } = this.state

    const component = query.component || ''
    const ext = Object.entries(query)
      .filter(([key]) => key !== 'component')
      .reduce((acc, [key, val]) => ({
        ...acc,
        [key]: val === 'false' ? false : val,
      }), {})

    const list = contextKeys
      .filter(file => fuzzySearch(file, search))
      .filter(file => file !== './preview/index.js')
      .map(file => ({
        active: component && file.includes(component),
        file: file.slice(2, -3),
      }))

    let Comp = NotFound
    if (component) {
      try {
        Comp = require(`common/${component}`).default
      } catch (e) {
        debug('Require error:', e, component)
        Comp = NotFound
      }
    }

    return (
      <div className={showList || this.state.showLock ? classes.show : classes.root} >
        <div
          onMouseEnter={() => this.setter('showList', true)}
          onMouseLeave={() => this.setter('showList', false)}
          className={classes.panel}
        >
          <div className={classes.inputWrapper} >
            <input
              type="text"
              onChange={e => this.setter('search', e.target.value)}
              value={search}
              className={classes.input}
              placeholder="Enter component name"
            />
            <button
              type="button"
              className={classes.inputClear}
              onClick={() => this.setter('search', '')}
            >
              <IconClose />
            </button>
            <button
              type="button"
              className={this.state.showLock ? classes.showLockOn : classes.showLock}
              onClick={() => this.setter('showLock', !this.state.showLock)}
            >
              <PinnedIcon />
            </button>
          </div>
          <ul
            className={classes.list}
          >
            {list.map(li => (
              <li
                key={li.file}
              >
                <Link
                  className={li.active ? classes.active : classes.link}
                  title={li.file}
                  to={{
                    pathname: '/preview',
                    query: {
                      component: li.file,
                    },
                  }}
                >
                  {li.file}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.target} >
          <Comp {...ext} />
        </div>
      </div>
    )
  }
}

const Index = injectSheet(styles)(Preview)
export default connect(provider)(Index)
