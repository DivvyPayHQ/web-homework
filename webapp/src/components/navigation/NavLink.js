import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { css } from '@emotion/core'

export function NavLink (props) {
  return (
    <li>
      <RouterNavLink css={linkStyles} {...props} />
    </li>
  )
}

const linkStyles = css`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  color: black;
  text-decoration: none;
  height: 100%;
  border-radius: 4px 4px 0px 0px;

  &.active {
    background: black;
    color: #ff41b4;
  }
`
