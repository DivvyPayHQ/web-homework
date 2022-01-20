import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../../../shared/colors'
import { Circle } from '../../../../components'
import { formatAmountFromFloat, formatDate } from '../../../../shared/util'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: ${props => props.gap || `8px`};
  margin: ${props => props.margin || `8px 0;`};
  width: 100%;
`

const PaymentMethod = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
function Details ({ transaction }) {
  return (
    <Wrapper>
      <Row margin='0 0 8px'>
        <div>Amount</div>
        <div>{formatAmountFromFloat(transaction.amount)}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Company</div>
        <div>{transaction.company.name}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Payment Methods</div>
        <div>
          <Row margin='0'>
            <PaymentMethod>
              <div>Credit</div>
              {transaction.credit ? <Circle color={colors.green} /> : <Circle color={colors.red} />}
            </PaymentMethod>
            <PaymentMethod>
              <div>Debit</div>
              {transaction.debit ? <Circle color={colors.green} /> : <Circle color={colors.red} />}
            </PaymentMethod>
          </Row>
        </div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Description</div>
        <div>{transaction.description}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Merchant</div>
        <div>{transaction.merchant.name}</div>
      </Row>
      <Row margin='0 0 8px'>
        <div>Created On</div>
        <div>{formatDate(transaction.insertedAt)}</div>
      </Row>
    </Wrapper>
  )
}

Details.defaultProps = {
  transaction: {}
}

Details.propTypes = {
  transaction: PropTypes.object
}

export default Details
