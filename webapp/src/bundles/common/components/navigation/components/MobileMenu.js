import React from 'react'
import { NAVIGATION } from '../constants/schema'
import { css } from '@emotion/core'
import Item from '../components/Item'
import shortId from 'shortid'
import { bool } from 'prop-types'

export default function MobileMenu ({ isOpen }) {
  return (
    <nav css={isOpen ? containerOpen : containerClosed}>
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

const container = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 5;
  background: black;
`

const containerOpen = css`
  ${container};
  transform: translateY(55px);
  transition: transform 0.5s ease-in-out;
`

const containerClosed = css`
  ${container};
  transform: translateY(-100%);
  transition: transform 0.5s ease-in-out;
`

MobileMenu.propTypes = {
  isOpen: bool.isRequired
}
