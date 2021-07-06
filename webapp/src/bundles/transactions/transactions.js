import React from 'react'
import TransactionsTable from './components/transactionTable/TransactionTable'
import Layout from '../common/components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState, selectTransactions } from 'Reducers/AppReducer'
import { number, shape, string, arrayOf, bool } from 'prop-types'
import NewButton from 'Components/buttons/NewButton'
import { useHistory } from 'react-router-dom'

function Transactions ({ theme, transactions, roman }) {
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
        roman={roman}
        theme={theme}
        transactions={transactions}
      />
    </Layout>
  )
}

function mapStateToProps (state) {
  const viewState = selectViewState(state)
  const transactionsState = selectTransactions(state)
  return {
    theme: viewState.theme,
    roman: viewState.roman,
    transactions: transactionsState.transactions
  }
}

export default connect(mapStateToProps)(Transactions)

Transactions.propTypes = {
  roman: bool.isRequired,
  transactions: arrayOf(shape({
    id: string,
    merchant: string,
    amount: number,
    date: string,
    category: string,
    status: string
  })),
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}
