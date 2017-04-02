import { configure } from '@kadira/storybook'
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

// all files in preview folder except ends with .data.js
// $1 - folder and $2 - file
const regexp = /(.*)\/preview\/(?![a-zA-Z0-9-_]*\.data\.js)([a-zA-Z0-9-_]*\.js)$/

// we have to copy-paste regexp here because require.context doesn't work with variables
const req = require.context(
  '../common',
  true,
  /(.*)\/preview\/(?![a-zA-Z0-9-_]*\.data\.js)([a-zA-Z0-9-_]*\.js)$/
)

function loadStories() {
  const folders = req.keys()
    .reduce((acc, file) => {
      const folder = file
        .replace(regexp, '$1')
        .slice(2)
      acc[folder] = []
        .concat(acc[folder], file)
        .filter(f => f)
      return acc
    }, {})

  Object.keys(folders)
    .forEach(folder => {
      const st = storiesOf(folder, module)

      folders[folder]
        .forEach(file => {
          const Story = req(file).default

          const f = file.replace(regexp, '$2')
          st.add(f, () => <Story action={action} />)
        })
    })
}

configure(loadStories, module)
