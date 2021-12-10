import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { css } from '@emotion/core'
import { useTheme } from '@emotion/react'

export function NavLink (props) {
  const theme = useTheme()

  return (
    <li>
      <RouterNavLink css={linkStyles(theme)} {...props} />
    </li>
  )
}

const linkStyles = theme => css`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  color: black;
  text-decoration: none;
  height: 100%;
  border-radius: 4px 4px 0px 0px;

  :hover {
    background: ${theme.colors.blue};
  }

  &.active {
    background: black;
    color: #ff41b4;
  }

`
