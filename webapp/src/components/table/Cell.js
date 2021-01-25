import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { TableCell } from '@material-ui/core'
import { formatCurrency } from '../../utils/transaction-utils'

const StyledCell = styled(TableCell)`
  width: ${props => props.column.width ? `${props.column.width}%` : 'auto'};
  text-transform: capitalize;
  /* use !important to override material table cell css */
  color: ${props => props.theme.colors.black} !important;
  text-align: ${props => ['number', 'currency'].includes(props.column.type) ? 'right' : 'left'} !important;
`

export const Cell = ({ column, row }) => {
  if (column.type === 'currency') {
    return <StyledCell column={column}>{formatCurrency(row[column.field])}</StyledCell>
  }

  return <StyledCell column={column}>{row[column.field]}</StyledCell>
}

Cell.propTypes = {
  column: PropTypes.shape({
    field: PropTypes.string.isRequired,
    headerLookup: PropTypes.string.isRequired,
    sortDisabled: PropTypes.bool,
    type: PropTypes.string,
    width: PropTypes.number.isRequired
  }).isRequired,
  row: PropTypes.object.isRequired
}
