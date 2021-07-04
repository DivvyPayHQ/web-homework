import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './home'
import Transactions from './bundles/transactions/index'

function AppRouter () {
  return (
    <Router>
      <Route component={Transactions} exact path='/transactions' />
      <Route component={Home} exact path='/' />
      <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
    </Router>
  )
}

export default AppRouter
