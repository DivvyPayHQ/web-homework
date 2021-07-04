import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/core'
import { string, func } from 'prop-types'
import { getIsActive } from '../functions/getIsActive'

export default function Item (props) {
  const { url, name, icon } = props
  const Icon = icon
  const location = useLocation()
  const isActive = getIsActive(location.pathname, url)
  return (
    <li css={container}>
      <Link to={url}>
        <div css={isActive ? contentActive : content}>
          <div className='icon-wrapper'>
            <Icon />
          </div>
          <p>{name}</p>
        </div>
      </Link>
    </li>
  )
}

const container = css`
  height: 50px;

  a {
    text-transform: capitalize;
    text-decoration: none;
    color: white;
  }
`

const content = css`
  display: flex;
  align-items: center;

  :hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }

  .icon-wrapper {
    width: 20px;
    padding: 15px;
  }
  
  p {
    margin: 0;
  }
`

const contentActive = css`
  ${content};

  background: rgba(255, 255, 255, 0.1);
  cursor: default;
`

Item.propTypes = {
  url: string.isRequired,
  name: string.isRequired,
  icon: func.isRequired
}
