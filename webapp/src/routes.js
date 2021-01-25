import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
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
              <NavLink activeClassName="is-active" exact to="/">Home</NavLink>
            </li>
            <li>
              <NavLink activeClassName="is-active" to="/users">Users</NavLink>
            </li>
            <li className="right">
              <NavLink activeClassName="is-active" to="/settings">Settings</NavLink>
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
  li > a {
    text-decoration: none;
    color: #575757;
    font-size: 16px;
  }
  .is-active {
    text-decoration: underline
  }
  li:hover {
    background-color: rgba(51, 170, 51, 0.1);
    transition: background-color 0.5s ease;
    border-radius: 40%;
  }
  .right {
    margin-left: auto;
  }
`;

const contentStyle = css`
  grid-row: 2;
`
