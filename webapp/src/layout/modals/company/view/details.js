import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../../../shared/colors'
import { formatAmountFromInt, formatDate } from '../../../../shared/util'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: ${props => props.margin || `8px 0;`};
  width: 100%;
`
const Wrapper = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: ${colors.mystic};
  padding: 8px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`
/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Details ({ company }) {
  return (
    <Wrapper>
      <Row margin='0 0 8px'>
        <div>Name</div>
        <div>{company.name}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Available Credit</div>
        <div>{formatAmountFromInt(company.availableCredit)}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Credit Line</div>
        <div>{formatAmountFromInt(company.creditLine)}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Created On</div>
        <div>{formatDate(company.insertedAt)}</div>
      </Row>
    </Wrapper>
  )
}

Details.defaultProps = {
  company: {}
}

Details.propTypes = {
  company: PropTypes.object
}

export default Details
