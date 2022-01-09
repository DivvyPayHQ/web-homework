/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import * as globalStyles from '../global styles/GlobalStyles'
import { useFirestore } from '../hooks/useFirestore'
import * as transactionStyles from './TransactionTableStyles'
import moment from 'moment'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export default function TransactionTable ({ data }) {
  const { deleteDocument } = useFirestore('transactions')

  return (
    <ul css={transactionStyles.transactionCard}>
      {
        data.map((transaction) => {
          const { id, description, merchantId, debit, credit, amount } = transaction
          const createdAt = moment.unix(transaction.createdAt.seconds).format('LLL')
          return (
            <>
              <li className='grid' key={transaction.id}>
                <div className='id'>{id}</div>
                <div className='created-at'>{createdAt}</div>
                <div className='description'>{ description }</div>
                <div className='amount'>$ {amount}</div>
                <div className='merchant'>{merchantId}</div>
                {credit && <div className='type' data-testid={makeDataTestId(id, 'credit')}>Credit</div>}
                {debit && <div className='type' data-testid={makeDataTestId(id, 'debit')}>Debit</div>}
                <button className='delete-button' css={globalStyles.buttonTwo} onClick={() => deleteDocument(transaction.id)}>x</button>
              </li>
            </>
          )
        }
        )}

    </ul>
  )
}
TransactionTable.propTypes = {
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
