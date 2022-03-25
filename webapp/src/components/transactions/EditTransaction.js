import { useState, useEffect } from 'react'
import { transactions } from '../../../mocks/transactions-data'
import * as editTransactionStyles from '../../styles/editTransactionStyles'

const EditTransaction = () => {
  const [editTransactionData, setEditTransactionData] = useState(transactions)

  const onDelete = (id) => {
    transactions.splice(transactions.findIndex(e => e.id === id))
  }

  const onSubmit = e => {
    e.preventDefault()
    transactions.push(editTransactionData)
    setEditTransactionData(editTransactionData)
  }

  const onChange = e => {
    if (e.target.id === 'id') {
      setEditTransactionData({ ...editTransactionData, id: e.target.value })
    } else if (e.target.id !== 'id') {
      return 'error'
    }
  }

  const handleRadio = e => {
    const { id } = e.target
    if (id === 'debit') {
      setEditTransactionData({ ...editTransactionData, debit: true, credit: false })
    } else {
      setEditTransactionData({ ...editTransactionData, debit: false, credit: true })
    }
  }

  useEffect(() => {
    console.log(editTransactionData)
  }, [])

  return (
    <div className='editTransactionData' css={editTransactionStyles.editTransactionStyle}>
      <h1 className='editTransactionHeader'>Edit Transaction</h1>
      <form className='editTransactionForm' onSubmit={onSubmit}>
        <label htmlFor='user_id'>User Id</label>
        <input
          className='editTransactionInput'
          type='text'
          name='user_id'
          placeholder='User_id'
          value={editTransactionData.user_id}
          onChange={onChange}
        />
        <label htmlFor='description'>Description</label>
        <input
          className='editTransactionInput'
          type='text'
          name='description'
          placeholder='Description'
          value={editTransactionData.description}
          onChange={onChange}
        />
        <label htmlFor='amount'>Amount</label>
        <input
          className='editTransactionInput'
          type='text'
          name='amount'
          placeholder='0.00'
          value={editTransactionData.amount}
          onChange={onChange}
        />
        <label htmlFor='debit'>Debit</label>
        <input
          className='editTransactionRadio'
          type='radio'
          name='paymentType'
          id='debit'
          value={editTransactionData.debit}
          checked={editTransactionData.debit}
          onChange={handleRadio}
        />
        <label htmlFor='credit'>Credit</label>
        <input
          className='editTransactionRadio'
          type='radio'
          name='paymentType'
          id='credit'
          value={editTransactionData.credit}
          checked={editTransactionData.credit}
          onChange={handleRadio}
        />
        <label htmlFor='merchant_id'>Merchant Id</label>
        <input
          className='editTransactionInput'
          type='text'
          name='merchant_id'
          value={editTransactionData.merchant_id}
          onChange={onChange}
        />
        <button className='updateTransactionButton'>Update</button>
        <button className='deleteTransactionButton' onClick={onDelete}>Delete</button>
      </form>
    </div>
  )
}

export default EditTransaction
