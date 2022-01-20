import React from 'react'
import styled from 'styled-components'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const DivvyLogoImg = styled.img`
  height: 44px;

  :hover {
    cursor: pointer;
  }
`
const Wrapper = styled.div`
  align-items: center;
  width: 240px;
`

/************************************
 * CONSTANTS
 ***********************************/
const DIVVY_LOGO_PNG_URL = 'https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19-White.png'
const DIVVY_URL = 'https://getdivvy.com/'

/************************************
 * LOCAL FUNCTIONS
 ***********************************/
const handleDivvyLogoClick = () => window.open(DIVVY_URL)

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function DivvyLogo () {
  return (
    <Wrapper>
      <DivvyLogoImg onClick={() => handleDivvyLogoClick()} src={DIVVY_LOGO_PNG_URL} />
    </Wrapper>
  )
}

export default DivvyLogo
