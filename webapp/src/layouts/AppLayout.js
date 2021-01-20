import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MainLayout } from './Main/MainLayout'
import TransactionLayout from '../routes/Transactions/TransactionsLayout'

export function AppLayout () {
  return (
    <Router>
      <Suspense>
        <MainLayout>
          <Route exact path='/' />
          <Route component={TransactionLayout} path='/transactions' />
        </MainLayout>
      </Suspense>
    </Router>
  )
}
