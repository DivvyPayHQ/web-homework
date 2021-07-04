import { createStore } from 'redux'
import ViewStateReducer from '../bundles/common/reducers/ViewStateReducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

function initStore () {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(ViewStateReducer, devToolsEnhancer())
  }
  return createStore(ViewStateReducer)
}

const store = initStore()

export default store
