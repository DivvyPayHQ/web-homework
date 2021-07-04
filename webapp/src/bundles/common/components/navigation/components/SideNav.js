import React from 'react'
import { NAVIGATION } from '../constants/schema'
import shortId from 'shortid'
import { css } from '@emotion/core'
import Item from '../components/Item'

export default function SideNav () {
  return (
    <nav css={containerStyle}>
      <img alt='logo' src='https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19-White.png' />
      <ul>
        {
          NAVIGATION.map(item => {
            const { name, url } = item
            return (
              <Item
                key={shortId.generate()}
                name={name}
                url={url}
              />
            )
          })
        }
      </ul>
    </nav>
  )
}

const containerStyle = css`
  width: 150px;
  background: black;
  padding: 10px 0;
  height: 100%;
  
  img {
    width: 150px;
    height: auto;
    margin-bottom: 30px;
  }
`
