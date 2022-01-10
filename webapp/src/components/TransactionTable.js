/* eslint-disable react/prop-types */
import React from 'react'
import { useFirestore } from '../hooks/useFirestore'
import * as globalStyles from '../global styles/GlobalStyles'
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
                <div className='id' data-testid={makeDataTestId(id, 'id')}>{id}</div>
                <div className='created-at' data-testid={makeDataTestId(id, 'createdAt')}>{createdAt}</div>
                <div className='description' data-testid={makeDataTestId(id, 'description')}>{ description }</div>
                <div className='amount' data-testid={makeDataTestId(id, 'amount')}>$ {amount}</div>
                <div className='merchant' data-testid={makeDataTestId(id, 'merchantId')}>{merchantId}</div>
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
