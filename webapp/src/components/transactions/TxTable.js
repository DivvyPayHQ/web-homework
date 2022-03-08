import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/react'

const styles = css`
 .header {
   font-weight: bold;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const TxTable = ({ data }) => {
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td>ID</td>
          <td>User ID</td>
          <td>Description</td>
          <td>Merchant ID</td>
          <td>Debit</td>
          <td>Credit</td>
          <td>Amount</td>
        </tr>
        {
          data.map(tx => {
            const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
            return (
              <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                <td data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
                <td data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

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
