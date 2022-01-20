import React from 'react'
import styled from 'styled-components'
import colors from '../../shared/colors'
import DivvyLogo from './divvy-logo'
import LogInSignUp from './log-in-sign-up'
import { NavRoutes } from '../routes'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Wrapper = styled.div`
  align-items: center;
  background-color: ${colors.black};
  color: ${colors.white};
  box-shadow: 0px 0px 4px 4px ${colors.grey};
  display: flex;
  font-size: 18px;
  height: 44px;
  justify-content: space-between;
  text-transform: uppercase;
  padding: 18px 32px;
  z-index: 1;
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function NavBar () {
  return (
    <Wrapper>
      <DivvyLogo />
      <NavRoutes />
      <LogInSignUp />
    </Wrapper>
  )
}

export default NavBar
