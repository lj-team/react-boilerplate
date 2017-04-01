import { ACTIONS } from './constants'

const {
  INIT,
} = ACTIONS

export const init = query => (dispatch, getState, { api }) => {
  api('data.get', { url: query && query.url })
    .then(() => {
      dispatch({
        type: INIT,
        payload: true,
      })
    })
}
