import React from 'react'
import { NAVIGATION } from '../constants/schema'
import shortId from 'shortid'
import { css } from '@emotion/core'
import Item from '../components/Item'

export default function SideNav () {
  return (
    <nav css={container}>
      <img alt='logo' src='https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19-White.png' />
      <ul>
        {
          NAVIGATION.map(item => {
            const { name, url, icon } = item
            return (
              <Item
                icon={icon}
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

const container = css`
  width: 170px;
  background: black;
  padding: 10px 0;
  box-sizing: border-box;
  height: 100%;
  
  img {
    width: 150px;
    height: auto;
    margin-bottom: 30px;
  }
`
