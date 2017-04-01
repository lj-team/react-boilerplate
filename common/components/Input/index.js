import React, { Component } from 'react'
import injectSheet from 'common/customJss'
import classJoiner from 'common/utils/classJoiner'

import styles from './styles'

const debug = require('debug')(`${__PROJECT__}:${__dirname}`)

const emptyFunc = () => {}

class Input extends Component {
  constructor(props) {
    super(props)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(event) {
    if (event.keyCode !== 13) return
    const { onEnter = emptyFunc } = this.props
    onEnter()
  }

  render() {
    const {
      sheet: { classes },
      className,
      inputClassName,
      id,
      value = '',
      name,
      type = 'text',
      placeholder = null,
      disabled = false,
      readOnly = false,
      onChange = emptyFunc,
      onFocus = emptyFunc,
      onBlur = emptyFunc,
      unitText = null,
      Icon = null,
      IconEnd = null,
      children = null,
      style = null,
      autoFocus = false,
    } = this.props

    debug('render')
    return (
      <div
        className={classJoiner([
          className,
          classes.root,
          Icon && classes.withIcon,
          IconEnd && !unitText && classes.withIconEnd,
          unitText && classes.withUnit,
        ])}
        style={style}
      >
        {Icon &&
          <div className={classes.holder} >
            <Icon className={classes.icon} />
          </div>
        }
        {IconEnd && !unitText &&
          <div className={classes.holderEnd} >
            <IconEnd className={classes.icon} />
          </div>
        }
        <input
          {...{
            id,
            name,
            type,
            value,
            placeholder,
            disabled,
            readOnly,
            autoFocus,
            onChange,
            onFocus,
            onBlur,
            onKeyUp: this.handleKeyUp,
            className: classJoiner([
              inputClassName,
              classes.control,
            ]),
          }}
          placeholder={placeholder}
        />
        {!!unitText &&
          <div
            className={classes.unit}
            data-text={unitText}
          />
        }
        {children}
      </div>
    )
  }
}

export default injectSheet(styles)(Input)
