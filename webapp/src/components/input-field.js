import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../shared/colors'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Wrapper = styled.input`
  border: 1px solid ${colors.jumbo};
  border-radius: 4px;
  font-family: 'Encode Sans', sans-serif;
  font-size: 16px;
  padding: 8px 16px;

  :hover {
    background-color: ${colors.smoke};
    cursor: ${props => props?.type !== 'text' && 'pointer'};
  }
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function InputField (props) {
  var isAmountType = props.type === 'amount'

  function onBlur (e) {
    var v = e.target.value
    if (isAmountType) {
      var amount = parseFloat(v).toFixed(2)
      v = parseInt(amount.toString().replace(/\D+/g, ''))
      props.onBlur(v)
    } else props.onBlur(e)
  }

  function onKeyPress (e) {
    if (isAmountType) {
      if (!/[\d.$]/.test(e.key)) {
        e.preventDefault()
      }
    }
  }

  return <Wrapper {...props} onBlur={onBlur} onKeyPress={onKeyPress} type={isAmountType ? 'text' : props.type} />
}

InputField.defaultProps = {
  type: 'text'
}

InputField.propTypes = {
  onBlur: PropTypes.func,
  type: PropTypes.string
}

export default InputField
