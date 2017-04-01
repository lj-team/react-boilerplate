import fontMixin from 'common/utils/font'

const height = 32
const borderWidth = 1
const fontSize = 14
const borderColor = '#D4DCE0'
const lineHeight = `${height - (2 * borderWidth)}`

export default {
  textColor: '#333',
  textColorDisabled: '#BCBFC1', // #333 + rgba(255, 255, 255, .5)
  placeholderColor: '#8C969B',
  placeholderColorDisabled: '#C1C8CB', // #8C969B + rgba(255, 255, 255, .5)

  fontSize,
  font: fontMixin(400, '1em', `${lineHeight / fontSize}em`),

  height,
  hPadding: 12, // Horizontal padding
  borderWidth,

  borderColor,
  borderColorError: '#FC9B9B',
  borderColorFocused: '#00A3D9',
  borderColorDisabled: '#EAEEF0', // #D4DCE0 + rgba(255, 255, 255, .5)

  border: { // jss-expand notation
    style: 'solid',
    color: borderColor,
    width: borderWidth,
  },

  borderRadius: 4,
  bgColor: '#FFF',

  iconColor: '#C8D4DA',

  // Input buttons
  buttonBgColor: 'transparent',
  buttonBgColorHover: '#F5F7F8',
  buttonBgColorActive: '#EFF3F5',
}
