import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../shared/colors'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Item = styled.div`
  align-items: center;
  display: flex;
  height: 32px;
  position: relative;
`

const RadioButtonLabel = styled.label`
  border: 1px solid ${colors.jumbo};
  position: absolute;
  top: 30%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
`

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 12px;
  height: 25px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: ${colors.mystic};
  }
  &:checked + ${Item} {
    background: ${colors.jumbo};
  }
  &:checked + ${RadioButtonLabel} {
    background: ${colors.jumbo};
  }
`

const Wrapper = styled.div`
  border: 1px solid ${colors.mystic};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 16px;
  gap: 16px;
  padding: 6px;
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Radio (props) {
  const { selected, setSelected, values } = props

  return (
    <Wrapper>
      <Item>
        <RadioButton
          checked={selected === values[0]}
          onChange={e => setSelected(e.target.value)}
          type='radio'
          value={values[0]}
        />
        <RadioButtonLabel />
        <div>{values[0]}</div>
      </Item>
      <Item>
        <RadioButton
          checked={selected === values[1]}
          onChange={e => setSelected(e.target.value)}
          type='radio'
          value={values[1]}
        />
        <RadioButtonLabel />
        <div>{values[1]}</div>
      </Item>
    </Wrapper>
  )
}

Radio.propTypes = {
  selected: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired
}

export default Radio
