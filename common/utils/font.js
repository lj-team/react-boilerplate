export default (w, s, l, t) => {
  let size = s
  if (Number.isInteger(size)) size += 'px'
  if (t === 'ptserif') {
    return `${w} ${size}/${l} "PT Serif", Georgia, serif`
  }
  return `${w} ${size}/${l} "ProximaNova", Helvetica, sans-serif`
}
