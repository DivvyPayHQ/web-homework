import React from 'react'
import PropTypes from 'prop-types'
import { TableHead, TableRow } from '@material-ui/core'
import { HeaderCell } from './HeaderCell'
import { translate } from '../../utils/translate'

export const Headers = ({ columns, onClick, sortField, sortAsc }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <HeaderCell
            column={column}
            key={column.field}
            onClick={() => onClick(column.field)}
            showSortIcon={sortField === column.field}
            sortAsc={sortAsc}
          >
            {translate(column.headerLookup)}
          </HeaderCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

Headers.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerLookup: PropTypes.string.isRequired,
      sortDisabled: PropTypes.bool,
      type: PropTypes.string,
      width: PropTypes.number.isRequired
    }).isRequired
  ),
  onClick: PropTypes.func,
  sortField: PropTypes.string,
  sortAsc: PropTypes.bool
}
