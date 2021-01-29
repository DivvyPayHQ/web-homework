import React, { useEffect, useState } from 'react'
import { deleteTransaction, getTransactions } from '../../gql/transactions.gql'
import { useMutation, useQuery } from '@apollo/client'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable () {
  const [removeTransactionMutation] = useMutation(deleteTransaction)
  const { loading, error, data = [] } = useQuery(getTransactions)

  const [transactionsList, setTransactionList] = useState([])
  useEffect(() => {
    setTransactionList(data.transactions)
  }, [data])

  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }

  if (error) {
    return (
      <>
        ¯\_(ツ)_/¯
      </>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='a dense table' size='small' >
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>Merchant ID</TableCell>
            <TableCell align='right'>Debit/Credit</TableCell>
            <TableCell align='right'>Amount</TableCell>
            <TableCell align='right'>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsList && transactionsList &&
            transactionsList.map((row) => {
              const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = row
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    {userId}
                  </TableCell>
                  <TableCell align='right'>{description}</TableCell>
                  <TableCell align='right'>{merchantId}</TableCell>
                  <TableCell align='right'>{credit} {debit}</TableCell>
                  <TableCell align='right'>{amount}</TableCell>
                  <TableCell align='right'>
                    <button
                      onClick={() => {
                        removeTransactionMutation({ variables: { id } })
                        setTransactionList(transactionsList.filter((item) => item.id !== id))
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
