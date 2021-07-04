import * as ACTION_TYPES from '../constants/actionTypes'

const initialState = {
  width: null,
  error: null
}

export default function ViewStateReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.WINDOW_RESIZE: {
      return Object.assign({}, state, {
        width: action.width
      })
    }
    default:
      return state
  }
}

export const selectViewState = (state) => {
  return {
    width: state.width,
    error: state.error
  }
}
