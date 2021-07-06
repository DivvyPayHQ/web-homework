import * as ACTION_TYPES from 'Constants/actionTypes'
import { getTheme, THEME_TYPES } from 'Config/theme'

const transactions = [
  {
    id: '1',
    merchant: 'Domino\'s Pizza',
    amount: 1000,
    date: '07-01-21',
    category: 'Food',
    status: 'COMPLETE'
  },
  {
    id: '2',
    merchant: 'Smiths',
    amount: 2456,
    date: '07-01-21',
    category: 'Food',
    status: 'PENDING'
  },
  {
    id: '3',
    merchant: 'Burt Brothers Tire',
    amount: 457,
    date: '07-01-21',
    category: 'Services',
    status: 'COMPLETE'
  },
  {
    id: '4',
    merchant: 'Rocky Mountain Power',
    amount: 685,
    date: '07-01-21',
    category: 'Services',
    status: 'PENDING'
  },
  {
    id: '5',
    merchant: 'Vet',
    amount: 3014,
    date: '07-01-21',
    category: 'Services',
    status: 'DECLINED'
  },
  {
    id: '6',
    merchant: 'Tesla',
    amount: 9999,
    date: '07-01-21',
    category: 'Shopping',
    status: 'PENDING'
  },
  {
    id: '7',
    merchant: 'Apple',
    amount: 7544,
    date: '07-01-21',
    category: 'Shopping',
    status: 'COMPLETE'
  },
  {
    id: '8',
    merchant: 'Hospital',
    amount: 1454,
    date: '07-01-21',
    category: 'Health',
    status: 'PENDING'
  },
  {
    id: '9',
    merchant: 'Maverick',
    amount: 8978,
    date: '07-01-21',
    category: 'Transportation',
    status: 'COMPLETE'
  },
  {
    id: '10',
    merchant: 'Park City Mountain',
    amount: 499,
    date: '07-01-21',
    category: 'Entertainment',
    status: 'COMPLETE'
  }
]

const initialState = {
  themeType: THEME_TYPES.DARK,
  roman: false,
  transactions
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
    transactions: state.transactions
  }
}
