/* eslint-disable camelcase, react/jsx-sort-props */
import React, { useState, useEffect, useRef } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { useMutation } from '@apollo/client'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ClearIcon from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneIcon from '@material-ui/icons/Done'
import EditIcon from '@material-ui/icons/Edit'
import transactionStyles from '../../styles/transactions'
import AddTransaction from '../../gql/addTransaction.gql'
import UpdateTransaction from '../../gql/updateTransaction.gql'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const tableHeaderKeys = [
  { id: 'id', label: 'ID', readOnly: true, placeholder: 'Auto Generated' },
  { id: 'user_id', label: 'User ID', placeholder: 'employee1' },
  { id: 'description', label: 'Description', placeholder: 'groceries' },
  { id: 'merchant_id', label: 'Merchant ID', placeholder: 'walmart' },
  { id: 'amount', label: 'Amount', placeholder: '-100 or +100' }
]

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const createData = (data) => data.map(({ id, user_id, description, merchant_id, debit, amount }) => ({
  id,
  user_id,
  description,
  merchant_id,
  amount,
  debit,
  isEditMode: false
}))

const TxTable = ({ data }) => {
  const [addTransaction] = useMutation(AddTransaction)
  const [updateTransaction] = useMutation(UpdateTransaction)
  const [rows, setRows] = useState(createData(data))
  const [previous, setPrevious] = useState({})
  const classes = transactionStyles()
  let resettingIdRef = useRef(null)

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
    })
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }))
    }
    const { value, name } = e.target
    const { id } = row
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value }
      }
      return row
    })
    setRows(newRows)
  }

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row
      }
      return row
    })
    console.log(newRows)
    setRows(newRows)
    setPrevious(state => {
      delete state[id]
      return state
    })
    resettingIdRef.current = id
  }

  const onDelete = id => {
    const newRows = rows.filter(row => row.id !== id)
    setRows(newRows)
    setPrevious(state => {
      delete state[id]
      return state
    })
    resettingIdRef.current = id
  }

  const onSave = async id => {
    if (id === '') {
      const newTransaction = rows.find(row => row.id === '')
      newTransaction.credit = /^\+/.test(newTransaction.amount) || false
      newTransaction.debit = /^-/.test(newTransaction.amount) || false
      newTransaction.amount = parseFloat(newTransaction.amount.substring(1))
      delete newTransaction.isEditMode
      delete newTransaction.id
      try {
        const { data } = await addTransaction({
          variables: {
            ...newTransaction
          }
        })

        const newRows = rows.map(row => {
          if (row.id === '') {
            return { ...row, id: data.addTransaction.id, isEditMode: false }
          }
          return row
        })
        setRows(newRows)
      } catch (err) {
        console.log(err)
      }
    } else {
      const updatedTransaction = rows.find(row => row.id === id)
      if (updatedTransaction.amount !== previous[id].amount) {
        updatedTransaction.credit = /^\+/.test(updatedTransaction.amount) || false
        updatedTransaction.debit = /^-/.test(updatedTransaction.amount) || false
        updatedTransaction.amount = parseFloat(updatedTransaction.amount.substring(1))
      }
      delete updatedTransaction.isEditMode
      try {
        await updateTransaction({
          variables: {
            ...updatedTransaction
          }
        })
        setRows(state => {
          return rows.map(row => {
            if (row.id === id) {
              delete row.credit
              return { ...row }
            }
            return row
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onAddTransactionClick = () => {
    const newRows = [...rows]
    const emptyRow = {
      id: '',
      user_id: '',
      description: '',
      merchant_id: '',
      amount: '',
      isEditMode: true
    }
    newRows.unshift(emptyRow)
    setRows(newRows)
  }

  useEffect(() => {
    if (resettingIdRef.current) {
      onToggleEditMode(resettingIdRef.current)
    }
    resettingIdRef.current = false
  }, [rows])

  return (
    <>
      <Grid container justifyContent='space-between' alignContent='center' className={classes.heading}>
        <Typography component='h1' variant='h3'>Transactions</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => onAddTransactionClick()}
          startIcon={<AddCircleOutlineIcon />}
          data-testid={'transaction-add-button'}
        >
          Add Transaction
        </Button>
      </Grid>
      <Paper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align='left' />
                {tableHeaderKeys.map(header => (
                  <TableCell align='left' key={header.id}>
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id} data-testid={makeDataTestId(row.id, 'table-row')} >
                  <TableCell className={classes.selectTableCell}>
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label='save'
                          onClick={() => onSave(row.id)}
                          data-testid={makeDataTestId(row.id, 'save-button')}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label='revert'
                          onClick={() => onRevert(row.id)}
                          data-testid={makeDataTestId(row.id, 'revert-button')}
                        >
                          <ClearIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          aria-label='edit'
                          onClick={() => onToggleEditMode(row.id)}
                          data-testid={makeDataTestId(row.id, 'edit-button')}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label='delete'
                          onClick={() => onDelete(row.id)}
                          data-testid={makeDataTestId(row.id, 'delete-button')}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                  {Object.keys(row).map(key => {
                    if (row.id === '60f5c0bc32fb272a902e5d86') { console.log(key) }
                    return key !== 'isEditMode' && key !== 'debit' && (
                      <TableCell align='left' className={classes.tableCell} key={key} data-testid={makeDataTestId(row.id, `${key}-cell`)} >
                        {row.isEditMode && key !== 'id' ? (
                          <Input
                            value={row[key]}
                            name={key}
                            onChange={e => onChange(e, row)}
                            className={classes.input}
                            placeholder={tableHeaderKeys.find(header => header.id === key).placeholder || ''}
                            inputProps={{ readOnly: tableHeaderKeys.find(header => header.id === key).readOnly || false }}
                            disabled={tableHeaderKeys.find(header => header.id === key).readOnly || false}
                            data-testid={makeDataTestId(row.id, `${key}-input`)}
                          />
                        ) : (
                          <>
                            {key === 'amount' ? (
                              <Typography style={{ color: row.debit ? 'red' : 'green' }}>
                                {`${row.debit ? '-' : '+'} ${formatter.format(row[key])}`}
                              </Typography>
                            ) : row[key]}
                          </>
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}

export default TxTable
