import React from 'react'
import { css } from '@emotion/core'
import { shape, bool, func } from 'prop-types'

export default function Switch ({ theme, on, onClick }) {
  return (
    <div css={backgroundStyle} style={on ? { background: theme.highlight } : { background: theme.accent }} onClick={onClick}>
      <div css={on ? switchStyleRight : switchStyleLeft} />
    </div>
  )
}

const backgroundStyle = css`
  width: 40px;
  height: 25px;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
`

const switchStyleLeft = css`
  background: white;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
`

const switchStyleRight = css`
  ${switchStyleLeft};
  left: 16px;
`
Switch.defaultProps = {
  on: false
}

Switch.propTypes = {
  theme: shape.isRequired,
  onClick: func.isRequired,
  on: bool
}
