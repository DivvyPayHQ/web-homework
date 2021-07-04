import * as ACTION_TYPES from '../constants/actionTypes'

export const setTheme = (themeType) => {
  return {
    type: ACTION_TYPES.SET_THEME,
    themeType
  }
}
