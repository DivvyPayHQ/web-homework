import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import Test from "./home/test.component";
function AppRouter(){
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/another'>Another route</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
        <Route component={Test} exact path='/' />
        <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
          {/* <Route path='/home' component={() => <div> /home</div>}>
          </Route>
            <Route path='/home/accounts' component={() => <div> /home/accounts</div>}>
              <Route path='/home/accounts/:name' component={() => <div> /home/accounts/:name</div>}>
              
              
          </Route>
          </Route> */}
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
