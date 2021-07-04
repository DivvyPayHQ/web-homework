import React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { string } from 'prop-types'

export default function Item (props) {
  const { url, name } = props
  return (
    <li css={styles}>
      <Link to={url}>{name}</Link>
    </li>
  )
}

const styles = css`
  padding: 10px;
  
  :hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  a {
    text-transform: capitalize;
    text-decoration: none;
    color: white;
  }
`

Item.propTypes = {
  url: string.isRequired,
  name: string.isRequired
}
