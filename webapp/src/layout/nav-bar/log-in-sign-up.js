import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../shared/colors'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const StyledLink = styled(Link)`
  background-color: ${colors.black};
  padding: 4px 18px;
  border-radius: 4px;
  padding: 8px 16px;

  :hover {
    background-color: ${colors.white};
    cursor: pointer;
    color: ${colors.black};
  }
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 6px;
  justify-content: space-between;
  width: 240px;

  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function LogInSignUp () {
  const location = useLocation()

  return (
    <Wrapper>
      <StyledLink state={{ background: location }} to={`/log-in`}>
        Log In
      </StyledLink>
      <StyledLink state={{ background: location }} to={`/sign-up`}>
        Sign Up
      </StyledLink>
    </Wrapper>
  )
}

export default LogInSignUp
