import React from 'react'
import { string, shape, bool } from 'prop-types'
import { css } from '@emotion/core'
import { baseValue, baseLabel } from '../../styles/text'

export default function TextLine (props) {
  const { label, value, theme, capitalize } = props
  const style = capitalize ? { color: theme.color, textTransform: 'capitalize' } : { color: theme.color }
  return (
    <div css={containerStyle}>
      <p css={labelStyle} style={style}>{label}</p>
      <p css={valueStyle} style={style}>{value}</p>
    </div>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: column;
`

const labelStyle = css`
    ${baseLabel}
`

const valueStyle = css`
    ${baseValue}
`

TextLine.defaultProps = {
  value: '',
  capitalize: false
}

TextLine.propTypes = {
  label: string.isRequired,
  value: string,
  theme: shape().isRequired,
  capitalize: bool
}
