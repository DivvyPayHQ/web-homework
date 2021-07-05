import React from 'react'
import { string, shape, number } from 'prop-types'
import { css, keyframes } from '@emotion/core'

export default function LoadSpinner (props) {
  const { text, theme, pixelDiameter, pixelThickness, color } = props
  const outerStyle = { width: `${pixelDiameter}px`, height: `${pixelDiameter}px`, borderColor: `${color || theme.highlight} transparent transparent transparent`, borderWidth: pixelThickness }
  const innerStyle = { width: `${pixelDiameter * 0.9}px`, height: `${pixelDiameter * 0.9}px`, borderColor: `${color || theme.highlight} transparent transparent transparent`, borderWidth: pixelThickness * 0.9 }
  return (
    <div css={containerStyles}>
      <div css={spinnerStyles} style={outerStyle}>
        <div css={first} style={innerStyle} />
        <div css={second} style={innerStyle} />
        <div css={third} style={innerStyle} />
        <div css={fourth} style={innerStyle} />
      </div>
      {
        text && (
          <p style={{ color: theme.color }}>{`${text}...`}</p>
        )
      }
    </div>
  )
}

const containerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;

  p {
    margin-top: 20px;
    font-size: 18px;
  }
`

const spinnerStyles = css`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const base = css`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;
`

const first = css`
    ${base};
`

const second = css`
  ${base};
  animation-delay: -0.45s;
`

const third = css`
  ${base};
  animation-delay: -0.3s;
`

const fourth = css`
  ${base};
  animation-delay: -0.15s;
`

LoadSpinner.defaultProps = {
  text: undefined,
  pixelDiameter: 60,
  pixelThickness: 8,
  color: null
}

LoadSpinner.propTypes = {
  text: string,
  theme: shape().isRequired,
  pixelDiameter: number,
  pixelThickness: number,
  color: string
}
