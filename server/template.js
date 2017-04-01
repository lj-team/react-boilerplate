import baseCss from './locals/base.css'

const STAT = process.env.STAT

const style = (link, content) => {
  if (STAT && link) {
    return `<link rel="stylesheet" type="text/css" href="${STAT}/${link}">`
  }
  return `<style type="text/css">${content}</style>`
}

const template = ({
  css = '',
  html = '',
  state = '',
  post = '',
} = {}) => (`
  <!doctype html>
  <html>
    <head>
      <title>Livejournal</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
      <link rel="icon" href="data:;base64,=">
      ${style('', baseCss)}
      <style type="text/css" id="server-side-styles">${css}</style>
    </head>
    <body>
      ${post}
      <div id="content">${html}</div>
      <script id="server-side-state">${state}</script>
      <script src="/core.js"></script>
    </body>
  </html>
`)

export default template
