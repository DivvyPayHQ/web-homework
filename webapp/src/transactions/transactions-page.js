import React, { useState, Fragment } from 'react'

const mockTransactions = [
  { id: 1, amount: '400.00', sender: 'Joe', receiver: 'Best Buy', category: 'Electronics', date: '12/26/2020' }
]

export function TransactionsPage (props) {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [currentTransaction, setCurrentTransaction] = useState({})

  const handleChange = event => {
    const transaction = { ...currentTransaction, amount: event.target.value }
    setCurrentTransaction(transaction)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const transaction = { ...currentTransaction, id: transactions.length + 1 }
    const newTransactions = [ ...transactions, transaction ]
    setTransactions(newTransactions)
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Transactions</h2>
        <h3>Add Transaction</h3>
        <input onChange={handleChange} type='text' />
        <input type='submit' value='Save' />

        <h3>Past Transactions</h3>
        {transactions.map(transaction => (
          <div key={transaction.id}> {transaction.amount} </div>
        ))}
      </form>
    </Fragment>
  )
}
