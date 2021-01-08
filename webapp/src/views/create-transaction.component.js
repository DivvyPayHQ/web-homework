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
      <div>Merchant</div>
      <select name='merchantId' onBlur={handleChange}>
        <option value=''> </option>
        <option value='344296f8-93a2-4935-8f4b-89a377585293'>Tesla</option>
      </select>

      <div>User</div>
      <select name='userId' onBlur={handleChange}>
        <option value=''> </option>
        <option value='1544bcf6-11a1-42ce-b640-b8e3ed2626d4'>Eliott Moreno</option>
      </select>
    </>
  )
}
