import React from 'react'
import TransactionsTable from './components/transactionTable/TransactionTable'
import Layout from '../common/components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from '../common/reducers/ViewStateReducer'
import { shape, string } from 'prop-types'
import NewButton from '../common/components/buttons/NewButton'
import { useHistory } from 'react-router-dom'

const transactions = [
  {
    id: '1',
    user_id: '2',
    description: 'test transaction',
    merchant_id: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '2',
    user_id: '2',
    description: 'test transaction',
    merchant_id: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '3',
    user_id: '2',
    description: 'test transaction',
    merchant_id: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '4',
    user_id: '2',
    description: 'test transaction',
    merchant_id: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '5',
    user_id: '2',
    description: 'test transaction',
    merchant_id: '321',
    debit: false,
    credit: true,
    amount: 10.45
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
