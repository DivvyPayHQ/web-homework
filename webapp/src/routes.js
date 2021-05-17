import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import Chart from './components/charts/Chart'
import BulkUpload from './components/bulk-upload/BulkUpload'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Account Transactions</Link>
            </li>
            <li>
              <Link to='/account-visualization'>Visualize My Finances</Link>
            </li>
            <li>
              <Link to='/bulk-upload'>Upload Tx Data</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Chart} exact path='/account-visualization' />
          <Route component={BulkUpload} exact path='/bulk-upload' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    h1 {
      margin: 0;
    }
`

const navStyle = css`
  grid-row: 1;

  background-color: #222;
  padding: 12px 32px;
  color: white;

  & a {
    font-size: 20px;
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  & a:hover{
    color: gray;
    text-decoration: underline;
  }

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
  padding: 0 8px 8px 32px;
`
