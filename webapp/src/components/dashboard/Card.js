import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'

export function Card ({ children, color = 'Brand300', ...rest }) {
  const tokens = useTokens()

  return (
    <article className={color} css={cardStyle(tokens, color)} {...rest}>
      {children}
    </article>
  )
}

Card.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string
}

const cardStyle = (tokens, color) => css`
  padding: ${tokens.Spacing.Large}px;
  color: black;
  border-radius: 4px;
  background-color: ${tokens.Color[color]};
  margin: 0px ${tokens.Spacing.Medium}px;
`
