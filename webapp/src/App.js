import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { css, Global } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'

import { Nav } from 'src/components/navigation/Nav'
import { Player } from 'src/components/music/Player'

export function App () {
  const tokens = useTokens()

  return (
    <Fragment>
      <Global styles={globalStyles(tokens)} />
      <Nav />
      <main className='main-content' css={contentStyle(tokens)}>
        <Outlet />
      </main>
      <Player />
    </Fragment>
  )
}

const contentStyle = tokens => css`
  padding: ${tokens.Spacing.Large}px;
  padding-top: ${tokens.Spacing.XLarge}px;
`

const globalStyles = tokens => css`
  background-color: ${tokens.Color.Black};
  color: ${tokens.Color.NeutralWhite};
`
