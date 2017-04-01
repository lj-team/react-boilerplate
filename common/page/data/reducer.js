import { ACTIONS } from './constants'

const {
  INIT,
} = ACTIONS

const initial = {
  isInit: false,
}

const data = (state = initial, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        isInit: action.payload,
      }
    default:
      return state
  }
}

export default data
