import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox } from '@material-ui/core'

const columns = [
  { id: 'id', align: 'left', hidden: true, label: '#' },
  { id: 'user_name', align: 'left', label: 'User' },
  { id: 'category_name', align: 'right', label: 'Category' },
  { id: 'merchant_name', align: 'left', label: 'Merchant' },
  { id: 'amount', align: 'right', label: 'Amount' },
  { id: 'credit', align: 'left', label: 'Credit' },
  { id: 'description', align: 'left', label: 'Description' },
  { id: 'date', align: 'right', label: 'Date' },
  { id: 'edit', align: 'right', label: 'Edit' }
]

export default function TransactionTableHead (props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            inputProps={{ 'aria-label': 'select all desserts' }}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            align={headCell.align}
            key={headCell.id}
            padding='default'
            sortDirection={orderBy === headCell.id ? order : false}
            style={headCell.hidden ? { display: 'none' } : {}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

TransactionTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}
