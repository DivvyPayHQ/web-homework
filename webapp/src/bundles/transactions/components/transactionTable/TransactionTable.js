import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import shortId from 'shortid'

export default function TransactionsTable ({ transactions }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>User Id</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Merchant Id</TableCell>
          <TableCell>Debit</TableCell>
          <TableCell>Credit</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          transactions.map((transaction, index) => {
            const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = transaction
            return (
              <TableRow key={shortId.generate()}>
                <TableCell>{id}</TableCell>
                <TableCell>{userId}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{merchantId}</TableCell>
                <TableCell>{debit}</TableCell>
                <TableCell>{credit}</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

TransactionsTable.propTypes = {
  transactions: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}
