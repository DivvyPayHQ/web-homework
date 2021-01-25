import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Text = styled.h2`
  color: ${props => props.theme.colors.black};
  margin: 0;
  font-family: ${props => props.theme.fontFamily};
  letter-spacing: .075em;
  text-transform: capitalize;
`

const Container = styled.section`
  width: 100%;
  padding: .5em 0;
`

export const MainHeader = ({ children }) => (
  <Container>
    <Text>
      {children}
    </Text>
  </Container>
)

MainHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}
