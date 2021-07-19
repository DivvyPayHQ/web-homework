import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavWrapper from './components/navigation/NavWrapper'
import Home from './features/home'
import Transactions from './features/transactions'
import Vendors from './features/vendors'
import Users from './features/users'

const AppRouter = () => (
  <Router>
    <NavWrapper>
      <Route component={Home} exact path='/' />
      <Route component={Transactions} exact path='/transactions' />
      <Route component={Vendors} exact path='/vendors' />
      <Route component={Users} exact path='/users' />
    </NavWrapper>
  </Router>
)

export default AppRouter
