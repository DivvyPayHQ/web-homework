import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'

export function Modal ({ children }) {
  const tokens = useTokens()

  return (
    <div css={containerStyle(tokens)}>
      <div css={scrimStyle} />
      <div css={childrenStyle(tokens)}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.any
}

const containerStyle = tokens => css`backgroundColor: 'transparent',
  bottom: 0,
  left: 0,
  position: fixed,
  right: 0,
  textAlign: center,
  top: 0,
  zIndex: 1000,
`

const childrenStyle = tokens => css`
  background-color: black; 
  border-radius: ${tokens.BorderRadius.Small}px;
  box-shadow: ${tokens.BoxShadow.Modal};
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  overflow: auto;
  top: 60px,
  z-index: 1001;
  min-width: 250px;
  max-width: 400px;
`

const scrimStyle = css`
  position: absolute,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  z-index: ,
  background-color: rgba(213, 216, 216, 0.64),
`
