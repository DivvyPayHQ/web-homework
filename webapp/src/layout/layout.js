import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Modals } from './modals'
import NavBar from './nav-bar'
import { Routes } from './routes'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Layout () {
  let location = useLocation()
  let background = location.state && location.state.background

  return (
    <Wrapper>
      <Modals background={background} />
      <NavBar />
      <Routes />
    </Wrapper>
  )
}

export default Layout
