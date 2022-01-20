import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../../shared/colors'
import { formatAmountFromInt, formatDate } from '../../../shared/util'

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
function CompaniesTableRow ({ company: c }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <TableRow onClick={() => navigate(`/companies/${c.id}`, { state: { background: location } })}>
        <Cell>{c.name}</Cell>
        <Cell>{formatAmountFromInt(c.availableCredit)}</Cell>
        <Cell>{formatAmountFromInt(c.creditLine)}</Cell>
        <Cell>{formatDate(c.insertedAt)}</Cell>
      </TableRow>
    </>
  )
}

CompaniesTableRow.defaultProps = {
  company: {}
}

CompaniesTableRow.propTypes = {
  company: PropTypes.object
}

export default CompaniesTableRow
