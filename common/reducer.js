import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { ACTIONS } from './constants'

const {
  SET_PAGE_SIZE,
} = ACTIONS

const pageInitial = {
  width: '',
  height: '',
}

const page = (state = pageInitial, action) => {
  switch (action.type) {
    case SET_PAGE_SIZE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const rootReducer = {
  routing,
  page,
}

export default (pageReducer = {}) => combineReducers({
  ...rootReducer,
  ...pageReducer,
})
