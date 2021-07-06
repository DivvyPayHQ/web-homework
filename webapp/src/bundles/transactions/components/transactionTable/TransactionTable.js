import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import shortId from 'shortid'
import { resolveTransactionStatus } from '../../functions/resolveTransactionStatus'
import { withTableStyles } from 'Components/table/helpers/withTableStyles'
import StatusIcon from 'Components/statusIcon/StatusIcon'
import { useHistory } from 'react-router-dom'
import { cleanEnum } from 'Utils/cleanEnum'


function TransactionsTable ({ transactions, classes }) {
  const history = useHistory()
  return (
    <Table>
      <TableHead>
        <TableRow className={classes.header}>
          <TableCell>Merchant</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell className={classes.responsiveColumn}>Date</TableCell>
          <TableCell className={classes.responsiveColumn}>Category</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          transactions.map((transaction, index) => {
            const { id, merchant, amount, date, category, status } = transaction
            const statusType = resolveTransactionStatus(status)
            return (
              <TableRow
                className={index % 2 === 0 ? classes.row : classes.rowOdd}
                key={shortId.generate()}
                onClick={() => history.push(`/transactions/${id}`)}
              >
                <TableCell>{merchant}</TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell className={classes.responsiveColumn}>{date}</TableCell>
                <TableCell className={classes.responsiveColumn}>{cleanEnum(category)}</TableCell>
                <TableCell>
                  <StatusIcon
                    statusType={statusType}
                    text={cleanEnum(status)}
                  />
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default withTableStyles(TransactionsTable)

TransactionsTable.propTypes = {
  classes: shape({
    row: string
  }),
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
