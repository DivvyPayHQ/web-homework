import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './home'
import Transactions from './bundles/transactions/transactions'
import TransactionsDetail from './bundles/transactions/transactionsDetail'

export default function App () {
  return (
    <Router>
      <Route component={TransactionsDetail} exact path='/transactions/:transactionId' />
      <Route component={Transactions} exact path='/transactions' />
      <Route component={Home} exact path='/' />
      <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
    </Router>
  )
}
