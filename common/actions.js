import { ACTIONS } from './constants'

const {
  CLOSE_ALL,
  SET_PAGE_SIZE,
} = ACTIONS

export const closeAll = () => ({
  type: CLOSE_ALL,
})

export const setSize = (width, height) => ({
  type: SET_PAGE_SIZE,
  payload: {
    width,
    height,
  },
})
