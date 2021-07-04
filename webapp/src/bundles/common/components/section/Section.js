import React from 'react'
import { string, func, node } from 'prop-types'
import { css } from '@emotion/core'

export const SECTION_TYPES = {
  QUARTER: '193px',
  HALF: '400px',
  FULL: '845px'
}

export default function Section (props) {
  const { title, children, type, buttons } = props
  return (
    <div css={container} style={{ width: type }}>
      <div css={header}>
        <p>{title}</p>
        {buttons}
      </div>
      {children}
    </div>
  )
}

const container = css`
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  margin-bottom: 15px;
`

const header = css`
  display: flex;
  justify-content: space-between;
  height: 30px;
  
  p {
    text-transform: uppercase;
    font-weight: 700;
  }
`

Section.defaultProps = {
  buttons: null
}

Section.propTypes = {
  buttons: func,
  title: string.isRequired,
  children: node.isRequired,
  type: string.isRequired
}
