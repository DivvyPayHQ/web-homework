import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'

import { Dashboard } from 'src/dashboard'
import { Transactions } from 'src/transactions'

import { Nav } from 'src/components/navigation/Nav'
import { Player } from 'src/components/music/Player'

import ROUTES from 'src/constants/Routes'

function AppRouter () {
  const tokens = useTokens()

  return (
    <Router>
      <Nav />
      <main className='main-content' css={contentStyle(tokens)}>
        <Route component={Dashboard} exact path={ROUTES.DASHBOARD} />
        <Route component={Transactions} path={ROUTES.TRANSACTIONS} />
      </main>
      <Player />
    </Router>
  )
}

export default AppRouter

const contentStyle = tokens => css`
  padding: ${tokens.Spacing.Large}px;
  padding-top: ${tokens.Spacing.XLarge}px;
`
