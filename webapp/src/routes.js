import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import Users from './users/users.component';
import Settings from './settings/settings';

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Route component={Nav} path="*" />
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

function Nav() {
  const location = useLocation();
  const query = new URLSearchParams(location.search)
  const styleRef = useRef()
  const i18n = query.get('i18n')
  useEffect(() => {
      // document.getElementsByTagName('body')[0].style.fontFamily = i18n ? 'Wingdings 3' : ''
    if (styleRef.current) {
      document.head.removeChild(styleRef.current)
      styleRef.current = undefined
    }
    if (i18n) {
      let styleElement = document.createElement('style')
      styleElement.type = 'text/css'
      styleElement.textContent = 'body {font-family: "Wingdings 3"}'
      document.head.appendChild(styleElement)
      styleRef.current = styleElement
    }
  },[i18n])

  const generateTo = path => `${path}${i18n ? '?i18n=true' : ''}`

  return (
    <nav css={navStyle}>
      <ul>
        <li>
          <NavLink activeClassName="is-active" exact to={generateTo("/")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="is-active" to={generateTo("/users")}>
            Users
          </NavLink>
        </li>
        <li>
          <Link to={`${location.pathname}${i18n ? '' : '?i18n=true'}`}>{i18n ? 'english' : 'i18n'}</Link>
        </li>
        <li className="right">
          <NavLink activeClassName="is-active" to={generateTo("/settings")}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  )
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
