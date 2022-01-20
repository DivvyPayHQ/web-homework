import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../shared/colors'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: ${props => props.color};
  border: 0;
  border-radius: 4px;
  color: ${props => props.secondary};
  font-size: 16px;
  font-weight: 500;
  height: 32px;
  justify-content: center;
  padding: 0 12px;

  :hover {
    background-color: ${colors.mystic};
    color: ${props => props.color};
    cursor: pointer;
  }
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Button (props) {
  const { children, color, secondary, onClick } = props

  return (
    <Wrapper color={color} onClick={onClick} secondary={secondary}>
      {children}
    </Wrapper>
  )
}

Button.defaultProps = {
  color: colors.royalBlue,
  secondary: colors.white,
  onClick: () => {}
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  secondary: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
