import React from 'react'
import { node } from 'prop-types'
import SideNav from '../navigation/components/SideNav'
import { css } from '@emotion/core'

export default function Layout ({ children }) {
  return (
    <div css={layoutWrapper}>
      <SideNav />
      <div css={childrenWrapper}>
        {children}
      </div>
    </div>
  )
}

const layoutWrapper = css`
  height: 100%;
  display: flex;
`

const childrenWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;
  padding: 0 15px;
  box-sizing: border-box;
  width: 845px;
`

Layout.propTypes = {
  children: node
}
