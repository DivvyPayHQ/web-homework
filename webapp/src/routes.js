import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { Home } from './home'
import AddTransaction from './components/transactions/AddTransaction'
import EditTransaction from './components/transactions/EditTransaction'

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
              <Link to='/addTransaction'>Add Transaction</Link>
            </li>
            <li>
              <Link to='/editTransaction'>Edit Transaction</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={AddTransaction} exact path='/addTransaction' />
          <Route component={EditTransaction} exact path='/editTransaction' />
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
