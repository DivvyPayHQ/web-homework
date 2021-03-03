import React from 'react'
import { arrayOf, string, bool, func, number, shape } from 'prop-types'
import { useMutation } from '@apollo/client'
import { DeleteTransaction } from 'gql/transactions.gql'
import { Link, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, Checkbox } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import TransactionTableHead from './TransactionTablehead'
import TransactionTableToolbar from './TransactionTableToolbar'
import { ConfirmationDialog } from 'components'

import { makeStyles } from '@material-ui/core/styles'
import styled from '@emotion/styled'
const StyledLink = styled(Link)`
  color: #3f51b5 !important;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    color: inherit;
    text-decoration: none;
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

function createData (transactionId, user, category, merchant, amount, credit, description, date) {
  return {
    transactionId,
    user_name: `${user.first_name} ${user.last_name}`,
    user_id: user.id,
    category_name: category.name,
    category_id: category.id,
    merchant_name: merchant.name,
    merchant_id: merchant.id,
    amount,
    credit,
    description,
    date
  }
}

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export default function TransactionTable ({ data, refetch }) {
  const classes = useStyles()
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('date')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const [deleteTransaction] = useMutation(DeleteTransaction, {
    onCompleted: () => {
      refetch()
    }
  })

  const rows = data.map(
    (d) => createData(
      d.id,
      d.user,
      d.category,
      d.merchant,
      d.amount,
      d.credit,
      d.description,
      d.date
    )
  )

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.transactionId)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const confirmDelete = () => {
    setConfirmDialogOpen(true)
  }

  const handleDelete = (confirm) => {
    setConfirmDialogOpen(false)
    if (confirm) {
      selected.forEach(async (id) => {
        await deleteTransaction({ variables: { id } })
      })
      setSelected([])
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (transactionId) => selected.indexOf(transactionId) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TransactionTableToolbar numSelected={selected.length} pushDelete={confirmDelete} />
        <TableContainer>
          <Table
            aria-label='table'
            aria-labelledby='tableTitle'
            className={classes.table}
            size='small'
          >
            <TransactionTableHead
              classes={classes}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.transactionId)
                  const labelId = `table-checkbox-${index}`

                  return (
                    <TableRow
                      aria-checked={isItemSelected}
                      hover
                      key={row.transactionId}
                      role='checkbox'
                      selected={isItemSelected}
                      tabIndex={-1}
                    >
                      <TableCell onClick={(event) => handleClick(event, row.transactionId)} padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align='left' id={labelId} style={{ display: 'none' }}>{row.transactionId}</TableCell>
                      <TableCell align='left'>
                        <StyledLink href={`/users/${row.user_id}`}>
                          {row.user_name}
                        </StyledLink>
                      </TableCell>
                      <TableCell align='right'>
                        <StyledLink href={`/categories/${row.category_id}`}>
                          {row.category_name}
                        </StyledLink>
                      </TableCell>
                      <TableCell align='left'>
                        <StyledLink href={`/merchants/${row.merchant_id}`}>
                          {row.merchant_name}
                        </StyledLink>
                      </TableCell>
                      <TableCell align='right'>{row.amount}</TableCell>
                      <TableCell align='left'>{row.credit ? 'YES' : 'NO'}</TableCell>
                      <TableCell align='left'>{row.description !== '' ? row.description : '-'}</TableCell>
                      <TableCell align='right'>{row.date}</TableCell>
                      <TableCell align='right'>
                        <StyledLink href={`/transactions/${row.transactionId}`}>
                          <EditIcon fontSize='small' />
                        </StyledLink>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          count={rows.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      <ConfirmationDialog
        keepMounted
        onClose={handleDelete}
        open={confirmDialogOpen}
        selected={selected.length}
      />
    </div>
  )
}

TransactionTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user: shape({
      first_name: string
    }),
    category: shape({
      name: string
    }),
    merchant: shape({
      name: string
    }),
    amount: number,
    credit: bool,
    debit: bool,
    description: string,
    date: string
  })),
  refetch: func
}
