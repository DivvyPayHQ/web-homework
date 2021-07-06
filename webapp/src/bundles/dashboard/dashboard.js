import React from 'react'
import Layout from 'Components/layout/Layout'
import Categories from './components/categories/Categories'
import { connect } from 'react-redux'
import { selectViewState, selectTransactions } from 'Reducers/AppReducer'
import { shape, string, number, bool } from 'prop-types'

function Dashboard ({ theme, transactions, roman }) {
  return (
    <Layout
      theme={theme}
      title='dashboard'
    >
      <Categories
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

export default connect(mapStateToProps)(Dashboard)

Dashboard.propTypes = {
  roman: bool.isRequired,
  transactions: shape({
    id: string,
    merchant: string,
    amount: number,
    date: string,
    category: string,
    status: string
  }),
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}
