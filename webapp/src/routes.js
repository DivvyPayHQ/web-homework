import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { App } from 'src/App'
import { Dashboard } from 'src/dashboard'
import { Transactions } from 'src/transactions'
import { TxModal } from 'src/components/transactions/TxModal'

import ROUTES from 'src/constants/Routes'

function AppRouter () {
  return (
    <Router>
      <Routes>
        <Route element={<App />} path='/'>
          <Route element={<Dashboard />} exact path={ROUTES.DASHBOARD} />
          <Route element={<Transactions />} path={ROUTES.TRANSACTIONS}>
            <Route element={<TxModal />} path={':id'} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
