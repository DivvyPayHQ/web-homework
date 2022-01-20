import React from 'react'
import styled from 'styled-components'
import colors from '../shared/colors'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Wrapper = styled.div`
  align-items: center;
  background-color: ${props => props.color};
  border-radius: 50%;
  border: 1px solid ${colors.mystic};
  height: ${props => props.height};
  width: ${props => props.width};
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function GreenCheck (props) {
  return <Wrapper {...props} />
}

GreenCheck.defaultProps = {
  height: '16px',
  width: '16px'
}

export default GreenCheck
