export default (...args) => {
  const items = Array.isArray(args[0]) ? args[0] : args
  return items.filter(e => e).join(' ')
}
