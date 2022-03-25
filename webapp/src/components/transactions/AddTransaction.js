import { useState } from 'react'
import { transactions } from '../../../mocks/transactions-data'
import * as addTransactionStyles from '../../styles/addTransactionStyles'

const addTransactionData = {
  id: Math.floor(Math.random() * 10000),
  user_id: '',
  description: '',
  amount: 0,
  debit: false,
  credit: false,
  merchant_id: ''
}

const AddTransaction = () => {
  const [transactionData, setTransactionData] = useState(addTransactionData)

  const onSubmit = (e) => {
    e.preventDefault()
    transactions.push(transactionData)
    setTransactionData(addTransactionData)
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setTransactionData({ ...transactionData, [name]: value })
  }

  const handleRadio = (e) => {
    const { id } = e.target
    if (id === 'debit') {
      setTransactionData({ ...transactionData, debit: true, credit: false })
    } else {
      setTransactionData({ ...transactionData, debit: false, credit: true })
    }
  }

  return (
    <div className='addTransactionDiv' css={addTransactionStyles.addTransactionStyle}>
      <h1 className='addTransactionHeader'>Add A Transaction</h1>
      <form className='addTransactionForm' onSubmit={onSubmit}>
        <label htmlFor='user_id'>User Id</label>
        <input
          className='addTransactionInput'
          type='text'
          name='user_id'
          placeholder='User Id'
          value={transactionData.user_id}
          onChange={onChange}
        />
        <label htmlFor='description'>Description</label>
        <input
          className='addTransactionInput'
          type='text'
          name='description'
          placeholder='Description'
          value={transactionData.description}
          onChange={onChange}
        />
        <label htmlFor='amount'>Amount</label>
        <input
          className='addTransactionInput'
          type='text'
          name='amount'
          placeholder='0.00'
          value={transactionData.amount}
          onChange={onChange}
        />
        <label htmlFor='debit'>Debit</label>
        <input
          className='addTransactionRadio'
          type='radio'
          name='paymentType'
          id='debit'
          value={transactionData.debit}
          onChange={handleRadio}
        />
        <label htmlFor='credit'>Credit</label>
        <input
          className='addTransactionRadio'
          type='radio'
          name='paymentType'
          id='credit'
          value={transactionData.credit}
          onChange={handleRadio}
        />
        <label htmlFor='merchant_id'>Merchant Id</label>
        <input
          className='addTransactionInput'
          type='text'
          name='merchant_id'
          placeholder='Company'
          value={transactionData.merchant_id}
          onChange={onChange}
        />
        <button id='addTransactionButton'>Add</button>
      </form>
    </div>
  )
}

export default AddTransaction
