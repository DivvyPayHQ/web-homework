import React from 'react'
import PropTypes from 'prop-types'
import { TableRow } from '@material-ui/core'
import { Cell } from './Cell'

export const Row = ({ columns, row }) => (
  <TableRow>
    {columns.map(column => (
      <Cell column={column} key={column.field} row={row} />
    ))}
  </TableRow>
)

Row.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerLookup: PropTypes.string.isRequired,
      sortDisabled: PropTypes.bool,
      type: PropTypes.string,
      width: PropTypes.number.isRequired
    }).isRequired
  ),
  row: PropTypes.object.isRequired
}
