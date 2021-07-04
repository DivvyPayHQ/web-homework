import * as ACTION_TYPES from '../constants/actionTypes'
import { getTheme, THEME_TYPES } from '../config/theme'

const initialState = {
  width: null,
  error: null,
  themeType: THEME_TYPES.DARK
}

export default function ViewStateReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.WINDOW_RESIZE: {
      return Object.assign({}, state, {
        width: action.width
      })
    }
    case ACTION_TYPES.SET_THEME: {
      return Object.assign({}, state, {
        themeType: action.themeType
      })
    }
    default:
      return state
  }
}

export const selectViewState = (state) => {
  return {
    width: state.width,
    error: state.error,
    theme: getTheme(state.themeType)
  }
}
