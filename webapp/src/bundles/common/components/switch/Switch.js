import React from 'react'
import { css } from '@emotion/core'
import { shape, bool, func, string } from 'prop-types'

export default function Switch ({ theme, on, onClick }) {
  return (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div css={backgroundStyle} onClick={onClick} style={on ? { background: theme.highlight } : { background: theme.accent }}>
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
  transition: left 0.2s;

`

const switchStyleRight = css`
  ${switchStyleLeft};
  left: 16px;
  transition: left 0.2s;
`
Switch.defaultProps = {
  on: false
}

Switch.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  }),
  onClick: func.isRequired,
  on: bool
}
