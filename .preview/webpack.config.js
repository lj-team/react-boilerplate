const webpack = require('@kadira/storybook/node_modules/webpack')
const config = require('../webpack.config')

module.exports = function(storybookBaseConfig) {

  storybookBaseConfig.resolve.alias = Object.assign(
    {},
    storybookBaseConfig.resolve.alias,
    config.resolve.alias
  )

  const defs = config.plugins[2].definitions
  Object.keys(defs).forEach(key => {
    storybookBaseConfig.plugins[0].definitions[key] = defs[key]
  })

  storybookBaseConfig.plugins.push(
    new webpack.IgnorePlugin(/\.(test.js|test|md)$/)
  )

  return storybookBaseConfig
}
