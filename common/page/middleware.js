/* eslint-disable no-unused-vars */

const middleware = store => next => action => {
  // do some page specific
  return next(action)
}

export default middleware
