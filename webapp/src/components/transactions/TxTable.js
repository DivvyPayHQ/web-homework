import React, { useState } from 'react'
import { deleteTransaction, getTransactions, updateTransaction } from '../../gql/transactions.gql'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'

// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable () {
  const [removeTransactionMutation] = useMutation(deleteTransaction, {
    update (cache, { data }) {
      const removedTransaction = data.deleteTransaction
      const { transactions } = cache.readQuery({
        query: getTransactions
      })
      const filteredTransactions = transactions.filter((item) => item.id !== removedTransaction.id)
      cache.writeQuery({
        query: getTransactions,
        data: {
          transactions: [
            ...filteredTransactions
          ]
        }
      })
    }
  })
  const [updateTransactionMutation] = useMutation(updateTransaction, {
    update (cache, { data }) {
      const updatedTransaction = data.updateTransaction
      const { transactions } = cache.readQuery({
        query: getTransactions
      })
      const edittedTransactions = transactions.map((item) => {
        return item.id === updatedTransaction.id ? updatedTransaction : item
      })
      cache.writeQuery({
        query: getTransactions,
        data: {
          transactions: [
            ...edittedTransactions
          ]
        }
      })
      setIsEditting(false)
    }
  })

  const { loading, error, data = {} } = useQuery(getTransactions)
  const [isEditting, setIsEditting] = useState(false)
  const [editDescription, setEditDescription] = useState('')
  const [editAmount, setEditAmount] = useState('')

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
        Failed to get transactions. Refresh page.
      </>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='a dense table' size='small' >
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Merchant ID</TableCell>
            <TableCell>Debit/Credit</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.transactions &&
            data.transactions.map((row) => {
              const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = row
              return (
                <TableRow css={rowStyle} key={row.id}>
                  <TableCell component='th' scope='row'>
                    {userId}
                  </TableCell>
                  <TableCell css={descriptionStyle} >
                    {isEditting === id ? (
                      <TextField onChange={(event) => { setEditDescription(event.target.value) }} value={editDescription} />
                    ) : (
                      <>{ description }</>
                    )}
                  </TableCell>
                  <TableCell>{merchantId}</TableCell>
                  <TableCell>{credit} {debit}</TableCell>
                  <TableCell css={amountStyle}>
                    {isEditting === id ? (
                      <TextField onChange={(event) => { setEditAmount(event.target.value) }} value={editAmount} />
                    ) : (
                      <>{ amount }</>
                    )}
                  </TableCell>
                  <TableCell align='right' css={editIconStyle}>
                    {isEditting !== id ? (
                      <EditIcon
                        css={buttonStyle}
                        onClick={() => {
                          setIsEditting(id)
                          setEditDescription(description)
                          setEditAmount(amount)
                        }}
                      >
                        Edit
                      </EditIcon>
                    ) : (
                      <SaveIcon
                        onClick={() => {
                          const transaction = {
                            amount: +editAmount,
                            credit,
                            debit,
                            description: editDescription,
                            id,
                            merchantId: merchantId,
                            userId: userId
                          }
                          updateTransactionMutation({ variables: transaction })
                          setEditAmount('')
                          setEditDescription('')
                        }}
                      >
                        Save
                      </SaveIcon>
                    )}
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      css={deleteStyle}
                      onClick={() => {
                        removeTransactionMutation({ variables: { id } })
                      }}
                    >
                      Delete
                    </DeleteIcon>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const amountStyle = css`
  width: 80px;
`

const buttonStyle = css`
  min-width: 50px;
  max-width: 50px;
`

const deleteStyle = css`
  color: red;
`

const descriptionStyle = css`
  width: 166px;
`

const editIconStyle = css`
  max-width: 60px;
`

const rowStyle = css`
  height: 55px;
`
