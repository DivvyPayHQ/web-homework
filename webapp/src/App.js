import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { css, Global } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'

import { Nav } from 'src/components/navigation/Nav'
import { Player } from 'src/components/music/Player'

import { SettingsContext } from 'src/context/SettingsContext'

export function App () {
  const tokens = useTokens()

  const [settings, setSettings] = useState({
    showMusic: false,
    showRomanNumerals: false
  })

  return (
    <SettingsContext.Provider value={{ options: settings, updateSettings: setSettings }}>
      <Global styles={globalStyles(tokens)} />
      <Nav />
      <main css={contentStyle(tokens)}>
        <Outlet />
      </main>
      {settings.showMusic ? (
        <Player />
      ) : null}
    </SettingsContext.Provider>
  )
}

const contentStyle = tokens => css`
  flex: 1 0 auto;
  padding: ${tokens.Spacing.Large}px;
  padding-top: ${tokens.Spacing.XLarge}px;
`

const globalStyles = tokens => css`
  background-color: ${tokens.Color.Black};
  color: ${tokens.Color.NeutralWhite};
`
