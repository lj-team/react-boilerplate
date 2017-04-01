// eslint-disable-next-line import/prefer-default-export
export const debounce = (func, wait, immediate) => {
  let timeout
  return function inner(...params) {
    const context = this
    const args = params
    const later = function later() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// https://github.com/reactjs/reselect/blob/master/src/index.js
export const memoize = (func, equalityCheck = (a, b) => a === b) => {
  let lastArgs = null
  let lastResult = null
  const isEqualToLastArg = (value, index) => equalityCheck(value, lastArgs[index])
  return (...args) => {
    if (
      lastArgs === null ||
      lastArgs.length !== args.length ||
      !args.every(isEqualToLastArg)
    ) {
      lastResult = func(...args)
    }
    lastArgs = args
    return lastResult
  }
}

// Often useful as part of autocompletion features
// as more powerful substitute for plain `.indexOf()` test
export const findStrInStr = (source, target) => {
  if (!target || !source) {
    return true
  }

  const str = `${source.toLowerCase().split('')} `
  const lts = target.toLowerCase().split('')

  return !!lts
    .reduce((bd, l) => {
      const r = bd.indexOf(l)
      return r < 0 ? [] : bd.slice(r + 1)
    }, str)
    .length
}

export const arrToObj = (arr = [], key = 'id') =>
  arr.reduce((acc, item) => ({
    ...acc,
    [item[key]]: {
      ...item,
      id: item[key],
    },
  }), {})

export const throttle = (func, delay) => {
  let ctx
  let args
  let timer
  let shouldBeCalled = false

  return function inner(...params) {
    ctx = this
    args = params

    const callFunc = () => {
      timer = null
      if (!shouldBeCalled) { return }
      shouldBeCalled = false
      timer = setTimeout(callFunc, delay)

      return func.apply(ctx, args) // eslint-disable-line consistent-return
    }

    shouldBeCalled = true
    if (timer) { return }

    return callFunc() // eslint-disable-line consistent-return
  }
}
