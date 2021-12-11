import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { css } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'

export function NavLink (props) {
  const tokens = useTokens()

  return (
    <li>
      <RouterNavLink css={linkStyles(tokens)} {...props} />
    </li>
  )
}

const linkStyles = tokens => css`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  color: black;
  text-decoration: none;
  height: 100%;
  border-radius: 4px 4px 0px 0px;

  :hover {
    background: ${tokens.Color.Blue};
  }

  &.active {
    background: black;
    color: ${tokens.Color.Brand300};
  }

`
