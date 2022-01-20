import React from 'react'
import styled from 'styled-components'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const SuccessImg = styled.img`
  height: 300px;
  width: 300px;
`

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 32px;
  font-weight: 700;
  justify-content: center;
  width: 100%;
`

const URL = 'https://cdn.dribbble.com/users/1303437/screenshots/3686809/success_400x300.gif'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Success () {
  return (
    <Wrapper>
      <SuccessImg src={URL} />
    </Wrapper>
  )
}

export default Success
