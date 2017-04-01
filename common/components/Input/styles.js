import inputVars from 'common/styles/input'

/* input */
const size = `${inputVars.height / inputVars.fontSize}em`
const hPadding = `${inputVars.hPadding / inputVars.fontSize}em`
const hPaddingWithIcon = `${35 / inputVars.fontSize}em`

/* icon container */
const iconHolderMargin = `${4 / inputVars.fontSize}em`

/* unit */
const unitFontSize = 12

const styles = {

  root: {
    position: 'relative',
    width: '100%',
    fontSize: inputVars.fontSize,
  },

  hasError: {},
  withIcon: {},
  withIconEnd: {},

  withUnit: {
    zIndex: 0,
    display: 'flex',
  },

  holder: { // icon
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    height: size,
    width: size,
    left: iconHolderMargin,
    pointerEvents: 'none',
  },

  holderEnd: { // icon
    composes: '$holder',
    left: 'auto',
    right: iconHolderMargin,
  },

  icon: {
    height: `${16 / inputVars.fontSize}em`,
    width: 'auto',
    fill: inputVars.iconColor,
  },

  control: {
    boxSizing: 'border-box',
    padding: [0, hPadding],
    width: '100%',
    height: size,
    font: inputVars.font,
    color: inputVars.textColor,
    border: inputVars.border,
    backgroundColor: inputVars.bgColor,
    borderRadius: `${inputVars.borderRadius / inputVars.fontSize}em`,
    transition: 'border-color .2s',

    ie: {
      lineHeight: `${34 / inputVars.fontSize}em`,
    },

    '&:read-only': {
      cursor: 'default',
    },

    '$hasError &': {
      borderColor: inputVars.borderColorError,
    },

    '&:focus': {
      outline: 0,
      borderColor: inputVars.borderColorFocused,
    },

    '&:disabled': {
      borderColor: inputVars.borderColorDisabled,
      color: inputVars.textColorDisabled,
      cursor: 'not-allowed',
    },

    '&::placeholder': {
      color: inputVars.placeholderColor,
    },

    '&:disabled::placeholder': {
      color: inputVars.placeholderColorDisabled,
    },

    '$withIcon &': {
      paddingLeft: hPaddingWithIcon,
    },

    '$withIconEnd &': {
      paddingRight: hPaddingWithIcon,
    },

    '$withUnit &': {
      flex: 'auto',
      width: 1, // Fix for EDGE
      borderColor: 'transparent',
      background: 'transparent',
    },
  },

  unit: {
    flex: 'none',
    height: size,
    margin: [0, hPadding, 0, -inputVars.borderWidth],

    /* pseudo input border */
    '&:before': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      zIndex: -1,
      top: 0,
      right: 0,
      left: 0,
      height: size,
      border: inputVars.border,
      borderRadius: `${inputVars.borderRadius / inputVars.fontSize}em`,
      backgroundColor: inputVars.bgColor,
      transition: 'border-color .2s',
    },

    '$control:focus ~ &:before': {
      borderColor: inputVars.borderColorFocused,
    },

    '$control:disabled ~ &': {
      color: inputVars.textColorDisabled,
    },

    '$control:disabled ~ &:before': {
      borderColor: inputVars.borderColorDisabled,
    },

    '$hasError &:before': {
      borderColor: inputVars.borderColorError,
    },

    /* unit text */
    '&:after': {
      position: 'relative',
      content: 'attr(data-text)',
      fontSize: `${unitFontSize / inputVars.fontSize}em`,
      lineHeight: `${32 / unitFontSize}em`,

      ie: {
        lineHeight: `${35 / unitFontSize}em`,
      },
    },
  },

  message: {
    position: 'absolute',
    top: 0,
    left: 'calc(100% + 12px)',
    minWidth: 125,
  },
}

export default styles
