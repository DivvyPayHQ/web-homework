import * as ACTION_TYPES from 'Constants/actionTypes'
import { getTheme, THEME_TYPES } from 'Config/theme'

const transactions = [
  {
    id: '1',
    merchant: 'Domino\'s Pizza',
    amount: '12.23',
    date: '07-01-21',
    category: 'FOOD_AND_DRINK',
    status: 'COMPLETE'
  },
  {
    id: '2',
    merchant: 'Domino\'s Pizza',
    amount: '12.23',
    date: '07-01-21',
    category: 'FOOD_AND_DRINK',
    status: 'PENDING'
  },
  {
    id: '3',
    merchant: 'Domino\'s Pizza',
    amount: '12.23',
    date: '07-01-21',
    category: 'FOOD_AND_DRINK',
    status: 'COMPLETE'
  },
  {
    id: '4',
    merchant: 'Domino\'s Pizza',
    amount: '12.23',
    date: '07-01-21',
    category: 'FOOD_AND_DRINK',
    status: 'PENDING'
  },
  {
    id: '5',
    merchant: 'Domino\'s Pizza',
    amount: '12.23',
    date: '07-01-21',
    category: 'FOOD_AND_DRINK',
    status: 'DECLINED'
  }
]

const initialState = {
  themeType: THEME_TYPES.DARK,
  roman: false,
  transactions,
}

export default function AppReducer (state = initialState, action) {
  switch (action.type) {
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
    theme: getTheme(state.themeType),
    roman: state.roman
  }
}

export const selectTransactions = (state) => {
  return {
    transactions: state.transactions,
  }
}
