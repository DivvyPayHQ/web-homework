import * as ACTION_TYPES from '../constants/actionTypes'

export const windowResize = () => {
  const width = window.innerWidth
  return {
    type: ACTION_TYPES.WINDOW_RESIZE,
    width
  }
}
