import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
// import Chat from './Components/Chat'
import ChatScreen from './Components/ChatScreen'
import { Transactions } from './Components/Transactions'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/transactions'>Transactions</Link>
            </li>
            <li>
              <Link to='/chatScreen'>Chat</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Transactions} exact path='/transactions' />
          <Route component={ChatScreen} exact path='/chatScreen' />
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
    list-style-type: none;
    margin: -10px;
    padding: 10px;
    overflow: hidden;
    background-color: black;
  }

  & > ul > li {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    float: left;
  }

  & > ul > li > a {
    font-weight: bold;
    color: white;
    text-decoration: none;
  }

  & > ul > li > a:hover {
    font-weight: bold;
    color: gray;
    text-decoration: none;
  }
`

const contentStyle = css`
  grid-row: 2;
`
