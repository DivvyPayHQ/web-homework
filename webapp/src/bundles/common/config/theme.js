import * as COLORS from './colors'

export const THEME_TYPES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK'
}

const LIGHT = {
  type: THEME_TYPES.LIGHT,
  background: COLORS.WHITE,
  secondary: COLORS.WHITE_SECONDARY,
  color: COLORS.BLACK,
  accent: COLORS.LIGHT_ACCENT,
  highlight: COLORS.PURPLE
}

const DARK = {
  type: THEME_TYPES.DARK,
  background: COLORS.BLACK,
  secondary: COLORS.BLACK_SECONDARY,
  color: COLORS.WHITE,
  accent: COLORS.DARK_ACCENT,
  highlight: COLORS.PURPLE
}

export function getTheme (themeType) {
  if (themeType === THEME_TYPES.LIGHT) {
    return LIGHT
  }
  return DARK
}
