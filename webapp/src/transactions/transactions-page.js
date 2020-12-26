import React, { useState, Fragment } from 'react'

const mockTransactions = [
  { id: 1, amount: '400.00', user: 'Joe', merchant: 'Best Buy', description: 'Electronics', credit: false, debit: true },
  { id: 2, amount: '100.00', user: 'Joe', merchant: 'Target', description: 'Return', credit: true, debit: false }
]

export function TransactionsPage () {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [currentTransaction, setCurrentTransaction] = useState({ amount: '', user: '', merchant: '', description: '', credit: false, debit: false })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    const name = target.name

    const transaction = { ...currentTransaction, [name]: value }
    setCurrentTransaction(transaction)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const transaction = { ...currentTransaction, id: transactions.length + 1 }
    const newTransactions = [ ...transactions, transaction ]
    setTransactions(newTransactions)
    setCurrentTransaction({ amount: '', user: '', merchant: '', description: '', credit: false, debit: false })
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <h2>Transactions</h2>
        <h3>Add Transaction</h3>
        <label>
          Amount
          <input name='amount' onChange={handleInputChange} type='text' value={currentTransaction.amount} />
        </label>
        <label>
          User
          <input name='user' onChange={handleInputChange} type='text' value={currentTransaction.user} />
        </label>
        <label>
          Merchant
          <input name='merchant' onChange={handleInputChange} type='text' value={currentTransaction.merchant} />
        </label>
        <label>
          Description
          <input name='description' onChange={handleInputChange} type='text' value={currentTransaction.description} />
        </label>
        <input type='submit' value='Save' />

        <h3>Past Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Merchant</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.user}</td>
                <td>{transaction.merchant}</td>
                <td>{transaction.description}</td>
                <td>{(transaction.credit ? '+' : transaction.debit ? '-' : '') + transaction.amount }</td>
              </tr>
            ))}
          </tbody>
        </table>

      </form>
    </Fragment>
  )
}
