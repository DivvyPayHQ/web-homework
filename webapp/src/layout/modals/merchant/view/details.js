import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../../../shared/colors'
import { formatDate } from '../../../../shared/util'

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
function Details ({ merchant }) {
  return (
    <Wrapper>
      <Row margin='0 0 8px'>
        <div>Name</div>
        <div>{merchant.name}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Description</div>
        <div>{merchant.description}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Created On</div>
        <div>{formatDate(merchant.insertedAt)}</div>
      </Row>
    </Wrapper>
  )
}

Details.defaultProps = {
  merchant: {}
}

Details.propTypes = {
  merchant: PropTypes.object
}

export default Details
