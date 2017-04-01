import createHash from 'murmurhash-js/murmurhash3_gc'
import { create as createJss } from 'jss'
import { create as createInjectSheet } from 'react-jss'

import preset from 'jss-preset-default'

import { ie, edge } from 'common/utils/browser'
import { cssDebug } from 'common/project/debug'

const jss = createJss()
const injectSheet = createInjectSheet(jss)

function pseudoPrefixer() {
  const prefixes = [
    '::-webkit-input-placeholder',
    ':-moz-placeholder',
    '::-moz-placeholder',
    ':-ms-input-placeholder',
    '::placeholder',
  ]
  const prefixer = {}

  return (rule) => {
    const { sheet } = rule.options

    if (rule.name && !prefixer[rule.name] && rule.name.match(/::placeholder/)) {
      sheet.deleteRule(rule.name)
      prefixes.forEach(prefix => {
        const name = rule.name
          .slice(1)
          .replace(/::placeholder/, prefix)
        prefixer[name] = true
        sheet.addRule(name, { ...rule.style }, { className: name })
      })
    }
  }
}

function fixIE() {
  return (rule) => {
    const { style, type } = rule
    if (!style || type !== 'regular') return

    if (style.edge) {
      const nStyle = style.edge
      delete style.edge
      if (edge) Object.assign(style, nStyle)
    }

    if (style.ie) {
      const nStyle = style.ie
      delete style.ie
      if (ie) Object.assign(style, nStyle)
    }
  }
}

function generateClassName(str, rule, sheet) {
  // eslint-disable-next-line no-param-reassign
  if (sheet && sheet.options.meta) str += sheet.options.meta

  const hash = createHash(str + rule.name)

  if ((__DEV__ || cssDebug) && rule.name) {
    const root = rule.name === 'root'
    const meta = (sheet && sheet.options.meta) || 'undef'

    return root ?
      `${meta}-${hash}` :
      `${meta}-${rule.name}-${hash}`
  }
  return `a${hash.toString(36)}`
}

jss.use(
  fixIE(),
  ...preset().plugins,
  pseudoPrefixer(),
)
jss.setup({
  generateClassName,
})

export default injectSheet
export { jss }
