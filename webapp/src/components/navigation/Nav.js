import React from 'react'
import { css } from '@emotion/core'
import { useTheme } from '@emotion/react'

import { NavLink } from 'src/components/navigation/NavLink'

import ROUTES from 'src/constants/Routes'

import Header from 'src/images/header.png'

export function Nav () {
  const theme = useTheme()

  return (
    <header css={headerStyle(theme)}>
      <div className='image-container'>
        <img alt="90's boy band memorabillia trader deluxe; A collection of love" src={Header} />
      </div>
      <nav aria-label='Main Menu'>
        <ul>
          <NavLink exact to={ROUTES.DASHBOARD}>Dashboard</NavLink>
          <NavLink to={ROUTES.TRANSACTIONS}>Transactions</NavLink>
          <NavLink to={ROUTES.TRANSACTIONS}>Merchants</NavLink>
          <NavLink to={ROUTES.TRANSACTIONS}>Users</NavLink>
          <NavLink to={ROUTES.TRANSACTIONS}>Settings</NavLink>
        </ul>
      </nav>
    </header>
  )
}

const headerStyle = theme => css`
  background-color: ${theme.colors.primary};

  & .image-container {
    max-height: 160px;
    overflow: hidden;
  }

  & nav {
    height: 60px;
    padding-left: ${theme.spacing.large};
  }

  & nav > ul {
      height: 100%;
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
`
