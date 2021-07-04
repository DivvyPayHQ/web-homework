import React, { useState } from 'react'
import { css } from '@emotion/core'
import MobileMenu from './MobileMenu'

export default function MobileNav () {
  const [ isOpen, setOpen ] = useState(false)
  return (
    <div css={containerStyle}>
      <div css={isOpen ? openMenu : closedMenu} onClick={() => setOpen(!isOpen)}>
        <div className='bar-one' />
        <div className='bar-two' />
      </div>
      <img alt='logo' css={logoStyle} src='https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19-White.png' />
      <div css={spacerStyle} />
      <MobileMenu
        isOpen={isOpen}
      />
    </div>
  )
}

const containerStyle = css`
  height: 55px;
  box-sizing: border-box;
  background: black;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const logoStyle = css`
  width: 150px;
  height: auto;
`

const spacerStyle = css`
    width: 30px;
`

const menuContainer = css`
  ${spacerStyle};
  height: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  
  div {
    height: 2px;
    width: 100%;
    background: white;
    transition: all 0.2s;
  }
`

const closedMenu = css`
   ${menuContainer}
`

const openMenu = css`
  ${menuContainer};
  
  .bar-one {
    transform: rotate(45deg) translateY(9px);
  }
  
  .bar-two {
    transform: rotate(-45deg) translateY(-9px);
  }
`
