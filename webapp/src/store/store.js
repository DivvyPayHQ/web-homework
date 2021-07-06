import { createStore } from 'redux'
import AppReducer from '../bundles/common/reducers/AppReducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

function initStore () {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(AppReducer, devToolsEnhancer())
  }
  return createStore(AppReducer)
}

const store = initStore()

export default store
