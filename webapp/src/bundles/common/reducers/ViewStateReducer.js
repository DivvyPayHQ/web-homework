import * as ACTION_TYPES from 'Constants/actionTypes'
import { getTheme, THEME_TYPES } from 'Config/theme'

const initialState = {
  width: null,
  error: null,
  themeType: THEME_TYPES.DARK,
  roman: false
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
    case ACTION_TYPES.TOGGLE_ROMAN: {
      return Object.assign({}, state, {
        roman: !state.roman
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
    theme: getTheme(state.themeType),
    roman: state.roman,
  }
}
