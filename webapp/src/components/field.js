import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../shared/colors'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Label = styled.div`
  color: ${colors.jumbo};
  font-weight: 600;
  margin: 0 0 2px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function InputField ({ children, label }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      {children}
    </Wrapper>
  )
}

InputField.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string
}

export default InputField
