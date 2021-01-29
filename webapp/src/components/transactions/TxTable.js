import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { Table, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable ({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Merchant ID</TableCell>
            <TableCell>Debit</TableCell>
            <TableCell>Credit</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        {data.map(tx => {
          const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
          return (
            <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
              <TableCell data-testid={makeDataTestId(id, 'id')}>{id}</TableCell>
              <TableCell data-testid={makeDataTestId(id, 'userId')}>{userId}</TableCell>
              <TableCell data-testid={makeDataTestId(id, 'description')}>{description}</TableCell>
              <TableCell data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</TableCell>
              <TableCell data-testid={makeDataTestId(id, 'debit')}>{debit}</TableCell>
              <TableCell data-testid={makeDataTestId(id, 'credit')}>{credit}</TableCell>
              <TableCell data-testid={makeDataTestId(id, 'amount')}>{amount}</TableCell>
            </tr>
          )
        })}
      </Table>
    </TableContainer>
  )
}

TxTable.propTypes = {
  data: arrayOf(
    shape({
      id: string,
      user_id: string,
      description: string,
      merchant_id: string,
      debit: bool,
      credit: bool,
      amount: number
    })
  )
}
