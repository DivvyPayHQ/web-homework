import React from 'react'
import TransactionsTable from './components/transactionTable/TransactionTable'
import Layout from '../common/components/layout/Layout'
const transactions = [
  {
    id: '1',
    userId: '2',
    description: 'test transaction',
    merchantId: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '2',
    userId: '2',
    description: 'test transaction',
    merchantId: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '3',
    userId: '2',
    description: 'test transaction',
    merchantId: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '4',
    userId: '2',
    description: 'test transaction',
    merchantId: '321',
    debit: false,
    credit: true,
    amount: 10.45
  },
  {
    id: '5',
    userId: '2',
    description: 'test transaction',
    merchantId: '321',
    debit: false,
    credit: true,
    amount: 10.45
  }
]

export default function Transactions () {
  return (
    <Layout>
      <TransactionsTable transactions={transactions} />
    </Layout>
  )
}
