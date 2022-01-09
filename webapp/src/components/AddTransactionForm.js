/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import * as globalStyles from '../global styles/GlobalStyles'
export default function AddTransactionForm ({ userId }) {
  const { addDocument, response } = useFirestore('transactions')
  const [description, setDescription] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [type, setType] = useState('credit')
  const [amount, setAmount] = useState(0)

  const resetForm = (e) => {
    setDescription('')
    setMerchantId('')
    setType('credit')
    setAmount('')
  }

  const addTransaction = (e) => {
    e.preventDefault()

    const randomId = Math.floor(Math.random() * 10000000).toString()
    addDocument({
      id: randomId,
      userId,
      description,
      merchantId,
      debit: type === 'debit',
      credit: type === 'credit',
      amount: Number(amount)
    })
  }

  useEffect(() => {
    if (response.success) {
      resetForm()
    }
  }, [response.success])

  return (
    <div css={globalStyles.form}>
      <form className='add-transaction-form' onSubmit={addTransaction}>
        <h2 className='form-title'>Add a Transaction</h2>
        <label>
          <span>Description:</span>
          <input onChange={(e) => setDescription(e.target.value)}
            required
            type='text'
            value={description} />
        </label>
        <label>
          <span>Merchant:</span>
          <input onChange={(e) => setMerchantId(e.target.value)}
            required
            type='text'
            value={merchantId} />
        </label>
        <label>
          <span>Type: </span>
          <select onBlur={(e) => setType(e.target.value)} required>
            <option value='credit'>Credit</option>
            <option value='debit'>Debit</option>
          </select>
        </label>
        <label>
          <span>Amount:</span>
          <input onChange={(e) => setAmount(e.target.value)}
            required
            step='0.01'
            type='number'
            value={amount}
          />
        </label>
        <div className='button-container'>
          <button css={globalStyles.buttonOne} type='submit'>Add</button>
        </div>
        {response.error && <p>{response.error}</p>}
      </form>
    </div>
  )
}
