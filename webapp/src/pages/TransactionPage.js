import React from 'react'
import TransactionTable from '../components/TransactionTable'
import AddTransactionForm from '../components/AddTransactionForm'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'
import * as globalStyles from '../global styles/GlobalStyles'
import * as transactionPageStyles from './TransactionPageStyles'

export default function TransactionPage () {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'transactions', ['userId', '==', user.uid],
    ['createdAt', 'desc']
  )

  return (
    <div css={transactionPageStyles.transactionPage}>
      <h3 className='title'>Transactions</h3>
      <div className='transaction-container'>
        <div className='transactions'>
          {documents && <TransactionTable data={documents} />}
        </div>
        <div className='add-transaction-form'>
          <AddTransactionForm userId={user.uid} />
          { error && <p css={globalStyles.errorMessage}>{ error }</p>}
        </div>
      </div>
    </div>
  )
}
