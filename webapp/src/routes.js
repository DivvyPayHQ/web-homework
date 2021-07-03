import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './home'

function AppRouter () {
  return (
    <Router>
      <Route component={Home} exact path='/' />
      <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
    </Router>
  )
}

export default AppRouter
