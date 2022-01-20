import React from 'react'
import styled from 'styled-components'
import { Route, Routes as RRRoutes, useLocation, useNavigate } from 'react-router-dom'
import colors from '../../shared/colors'
import Companies from './companies'
import Home from './home'
import Merchants from './merchants'
import Transactions from './transactions'
import Users from './users'

/************************************
 * CONSTANTS
 ***********************************/
const ROUTES = [
  { element: <Home />, label: 'Home', path: '/' },
  { element: <Companies />, label: 'Companies', path: '/companies' },
  { element: <Merchants />, label: 'Merchants', path: '/merchants' },
  { element: <Transactions />, label: 'Transactions', path: '/transactions' },
  { element: <Users />, label: 'Users', path: '/users' }
]

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const NavRoutesWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
  width: 100%;
`

const StyledRoutes = styled.div`
  align-items: center;
  display: flex;
  height: 46px;
  transition: height 0.1s;

  :hover {
    background-color: ${colors.white};
    cursor: pointer;
    color: ${colors.black};
    height: 82px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

/************************************
 * USED WITHIN NAVBAR FOR NAVIGATION
 ***********************************/
export function NavRoutes () {
  const navigate = useNavigate()

  return (
    <NavRoutesWrapper>
      {ROUTES.map((e, k) => (
        <StyledRoutes key={k} onClick={() => navigate(e.path)}>
          {e.label}
        </StyledRoutes>
      ))}
    </NavRoutesWrapper>
  )
}

/************************************
 * USED WITHIN REACT ROUTER DOM
 ***********************************/
export function Routes () {
  let location = useLocation()
  let background = location.state && location.state.background

  return (
    <Wrapper>
      <RRRoutes location={background || location}>
        {ROUTES.map((r, k) => (
          <Route element={r.element} exact key={k} path={r.path} />
        ))}
      </RRRoutes>
    </Wrapper>
  )
}
