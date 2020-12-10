import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import Dashboard from './pages/Dashboard'
import AddUser from './pages/AddUser'
import addMerchant from './pages/AddMerchant'
import AddTransaction from './pages/AddTransaction'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Dashboard</Link>
            </li>
            <li>
              <Link to='/addUser'>Add User</Link>
            </li>
            <li>
              <Link to='/addMerchant'>Add Merchant</Link>
            </li>
            <li>
              <Link to='/addTransaction'>Add Transaction</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Dashboard} exact path='/' />
          <Route component={AddUser} exact path='/addUser' />
          <Route component={addMerchant} exact path='/addMerchant' />
          <Route component={AddTransaction} exact path='/addTransaction' />

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

const navStyle = css`
  grid-row: 1;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-child) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
