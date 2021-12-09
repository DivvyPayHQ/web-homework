import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'

import { Nav } from 'src/components/navigation/Nav'

import ROUTES from 'src/constants/Routes'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Nav />
        <main className='main-content' css={contentStyle}>
          <Route component={Home} exact path={ROUTES.HOME} />
          <Route component={() => (<div>Content for /another route</div>)} path={ROUTES.TRANSACTIONS} />
        </main>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
`

const contentStyle = css`
  grid-row: 2;
`
