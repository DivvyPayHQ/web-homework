import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../../shared/colors'
import { Circle } from '../../../components'
import { formatAmountFromFloat, formatDate } from '../../../shared/util'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Cell = styled.td`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 64px;
  text-align: center;
  width: 100px;
  overflow: hidden;
`

const PaymentMethod = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-direction: row;
  width: 100%;
`

const TableRow = styled.tr`
  height: 64px;

  :hover {
    background-color: ${colors.mystic};
    cursor: ${props => props?.type !== 'text' && 'pointer'};
  }
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function TransactionsTableRow ({ transaction: t }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <TableRow onClick={() => navigate(`/transactions/${t.id}`, { state: { background: location } })}>
        <Cell>{formatAmountFromFloat(t.amount)}</Cell>
        <Cell>{t.company.name}</Cell>
        <Cell>
          <Row>
            <PaymentMethod>
              <div>Credit</div>
              {t.credit ? <Circle color={colors.green} /> : <Circle color={colors.red} />}
            </PaymentMethod>
            <PaymentMethod>
              <div>Debit</div>
              {t.debit ? <Circle color={colors.green} /> : <Circle color={colors.red} />}
            </PaymentMethod>
          </Row>
        </Cell>
        <Cell>{t.description}</Cell>
        <Cell>{t.merchant.name}</Cell>
        <Cell>{`${t.user.firstName} ${t.user.lastName}`}</Cell>
        <Cell>{formatDate(t.insertedAt)}</Cell>
      </TableRow>
    </>
  )
}

TransactionsTableRow.defaultProps = {
  transaction: {}
}

TransactionsTableRow.propTypes = {
  transaction: PropTypes.object
}

export default TransactionsTableRow
