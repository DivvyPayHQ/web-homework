import * as ACTION_TYPES from 'Constants/actionTypes'

export const setTheme = (themeType) => {
  return {
    type: ACTION_TYPES.SET_THEME,
    themeType
  }
}
