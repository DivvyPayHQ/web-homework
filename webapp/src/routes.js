import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { css } from '@emotion/react'
import { Home } from './home'

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
              <Link to='/another'>Another route</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Routes>
            <Route element={<Home />} exact path='/' />
            <Route element={<div>Content for /another route</div>} exact path='/another' />
          </Routes>
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
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
