import React from 'react'
import styled from 'styled-components'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 32px;
  font-weight: 700;
  justify-content: center;
  width: 100%;
`
const Header = styled.div`
  align-items: center;
  display: flex;
  font-size: 32px;
  font-weight: 700;
  justify-content: space-between;
  margin-bottom: 48px;
`

const NothingToSee = styled.img`
  height: 600px;
  width: 600px;
`

const Wrapper = styled.div`
  display: flex;
  padding: 60px 240px;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const NOTHING_TO_SEE_URL = 'https://c.tenor.com/7dpibk53rfsAAAAC/homer-the-simpsons.gif'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Home () {
  return (
    <Wrapper>
      <Header>
        <div>Home</div>
      </Header>
      <Content>
        <NothingToSee src={NOTHING_TO_SEE_URL} />
        <h2>Nothing to see here. . .</h2>
        <h3>But *Click* on that NavBar, Yo!</h3>
      </Content>
    </Wrapper>
  )
}

export default Home
