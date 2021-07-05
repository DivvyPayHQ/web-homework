import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Transactions from './bundles/transactions/transactions'
import TransactionsDetail from './bundles/transactions/transactionsDetail'
import Settings from './bundles/settings/settings'
import Dashboard from './bundles/dashboard/dashboard'

export default function App () {
  return (
    <Router>
      <Switch>
        <Route component={Dashboard} exact path='/dashboard' />
        <Route component={TransactionsDetail} exact path='/transactions/:transactionId' />
        <Route component={Transactions} exact path='/transactions' />
        <Route component={Settings} exact path='/settings' />
        <Redirect to='/dashboard' />
      </Switch>
    </Router>
  )
}
