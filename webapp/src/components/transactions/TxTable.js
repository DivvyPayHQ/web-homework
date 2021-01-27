import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import axios from 'axios'
const SERVER_URL = 'http://localhost:8000/graphql'

const styles = css`
 .header {
   font-weight: bold;
 }
 border-collapse: collapse;
 td {
   border: 1px solid black;
 }
 .entry:hover {
   cursor: pointer;
 }
 .trash-button {
   color: red;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable ({ data }) {
  const mutationQuery = `mutation delete($id:String){delete_article_by_pk(id:$id){id,user_id,merchant_id,description}}`

  const remove = (id) => {
    axios.post(SERVER_URL, {
      query: mutationQuery,
      variables: { id }
    })
  }

  const editEntry = (id, e) => {
    if (!e.target.className.includes('trash-button')) {
      window.location.replace(`/add/${id}`)
    }
  }

  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td >ID</td>
          <td >User ID</td>
          <td >Description</td>
          <td >Merchant ID</td>
          <td >Debit</td>
          <td >Credit</td>
          <td >Amount</td>
          <td >Delete?</td>
        </tr>
        {
          data.map(tx => {
            const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
            return (
              <tr
                className='entry'
                data-testid={`transaction-${id}`}
                key={`transaction-${id}`}
                onClick={(e) => editEntry(id, e)}
              >
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
                <td data-testid={makeDataTestId(id, 'debit')}>{debit ? <>&#10003;</> : ''}</td>
                <td data-testid={makeDataTestId(id, 'credit')}>{credit ? <>&#10003;</> : ''}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
                <td data-testid={makeDataTestId(id, 'delete')}><button className='trash-button' css={styles} onClick={() => remove(id)}>X</button></td>
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
