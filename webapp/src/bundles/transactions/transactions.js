import React from 'react'
import TransactionsTable from './components/transactionTable/TransactionTable'
import Layout from '../common/components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from 'Reducers/ViewStateReducer'
import { shape, string } from 'prop-types'
import NewButton from 'Components/buttons/NewButton'
import { useHistory } from 'react-router-dom'

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

function Transactions ({ theme }) {
  const history = useHistory()
  return (
    <Layout
      buttons={(
        <NewButton
          onClick={() => {
            history.push('/transactions/new')
          }}
        />
      )}
      theme={theme}
      title='transactions'
    >
      <TransactionsTable
        theme={theme}
        transactions={transactions}
      />
    </Layout>
  )
}

function mapStateToProps (state) {
  const viewState = selectViewState(state)
  return {
    theme: viewState.theme
  }
}

export default connect(mapStateToProps)(Transactions)

Transactions.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}
