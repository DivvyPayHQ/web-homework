import React, { useState } from 'react'

const EditTransactionForm = props => {
  debugger
  const [des, setDes] = useState('')

  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [transactionType, setTransactionType] = useState('')

  return (
    <div>
      <div>
        <form id='add-trans' onSubmit={handleSubmit}>
          <div className='field'>
            <label>User ID: </label>
            <input onChange={e => setUserId(e.target.value)} type='text' />
          </div>

          <div className='field'>
            <label>Merchant ID: </label>
            <input onChange={e => setMerchantId(e.target.value)} type='text' />
          </div>

          <div className='field'>
            <label>Amount: </label>
            <input onChange={e => setAmount(e.target.value != '' ? parseFloat(e.target.value) : 0)} type='text' />
          </div>

          <div className='field'>
            <label>Description: </label>
            <input onChange={e => setDescription(e.target.value)} type='text' />
          </div>

          <div className='field'>
            <label />
            <select onChange={e => setTransactionType(e.target.value)}>
              <option label='Debit' value='debit'>
                debit
              </option>
              <option label='Credit' value='credit'>
                credit
              </option>
            </select>
          </div>
          <button>Add</button>
        </form>
      </div>
    </div>
  )
}

export default EditTransactionForm
