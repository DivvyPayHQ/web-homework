import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { useTheme } from '@emotion/react'

export function Card ({ children, color = 'primary', ...rest }) {
  const theme = useTheme()

  return (
    <article className={color} css={cardStyle(theme, color)} {...rest}>
      {children}
    </article>
  )
}

Card.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string
}

const cardStyle = (theme, color) => css`
  padding: ${theme.spacing.large};
  color: black;
  border-radius: 4px;
  min-width: 320px;
  background-color: ${theme.colors[color]};
  flex: 1 0 auto;
  margin: 0px ${theme.spacing.medium};
`
