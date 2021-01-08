import React, { useState, useEffect } from 'react'

export function CreateTransaction () {
  const [transaction, setTransaction] = useState({ amount: 0, credit: false, debit: false, description: '', merchantId: undefined, userId: undefined })

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? Boolean(target.checked) : target.value
    setTransaction({ ...transaction, [target.name]: value })
  }

  useEffect(() => {
    console.log(transaction)
  }, [transaction])

  return (
    <>
      <div>amount</div>
      <input
        name='amount'
        onChange={handleChange}
        type='text'
        value={transaction.amount}
      />

      <div>debit</div>
      <input
        name='debit'
        onChange={handleChange}
        type='checkbox'
        value={transaction.debit}
      />

      <div>credit</div>
      <input
        name='credit'
        onChange={handleChange}
        type='checkbox'
        value={transaction.credit}
      />
      <div>description</div>
      <textarea
        name='description'
        onChange={handleChange}
        value={transaction.description}
      />
    </>
  )
}
