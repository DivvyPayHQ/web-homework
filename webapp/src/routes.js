/* eslint-disable no-multiple-empty-lines */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import Dashboard from './pages/Dashboard'
import AddUser from './pages/AddUser'
import addMerchant from './pages/AddMerchant'
import AddTransaction from './pages/AddTransaction'
import EditTransaction from './pages/EditTransaction'
import Header from './components/Layout/Header'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Header />
        <div className='main-content' css={contentStyle}>
          <Route component={Dashboard} exact path='/' />
          <Route component={AddUser} exact path='/addUser' />
          <Route component={addMerchant} exact path='/addMerchant' />
          <Route component={AddTransaction} exact path='/addTransaction' />
          <Route component={EditTransaction} exact path='/UpdateTransaction/:transaction_id' />

        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
`
const contentStyle = css`
  grid-row: 2;
`
