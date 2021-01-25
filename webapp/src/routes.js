import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import Users from './users/users.component';
import Settings from './settings/settings';

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li className='right'>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <div>
          <div className="main-content" css={contentStyle}>
            <Route component={Home} exact path="/" />
            <Route component={Users} exact path="/users" />
            <Route component={Settings} path="/settings" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    padding: 20px 50px;
`

const navStyle = css`
  grid-row: 1;

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }

  & > ul > li:not(:first-of-type):not(:last-of-type) {
    margin-left: 16px;
  }
  .right {
    margin-left: auto;
  }
`

const contentStyle = css`
  grid-row: 2;
`
