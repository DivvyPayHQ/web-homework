import { useState } from 'react'
import { transactions } from '../../../mocks/transactions-data'

const addTransactionData = {
  id: new Date(),
  userId: '',
  description: '',
  amount: 0.00,
  debit: false,
  credit: false,
  merchant: ''
}

const AddTransaction = () => {
    const [transactionData, setTransactionData] = useState(addTransactionData)

    const onSubmit = e => {
      e.preventDefault()
      transactions.append(transactionData)
      setTransactionData(addTransactionData)
    }

    const onChange = e => {
        const { name, value } = e.target
        setTransactionData({...transactionData,[name]:value})
    }

    const handleRadio = e => {
      const { id } = e.target
      if(id === 'debit') {
        setTransactionData({...transactionData, debit: true, credit: false})
      } else {
        setTransactionData({...transactionData, debit: false, credit: true})
      }
    }

    return (
        <div className='addTransactionData'>
            <h1 className='addTransactionData'>Add A Transaction</h1>
            <form className='addTransactionForm' onSubmit={onSubmit}>
              <label htmlFor='userId'>User Id</label>
                <input
                  className='addTransactionInput'
                  type='text'
                  name='userId'
                  placeholder='User Id'
                  value={transactionData.userId}
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
              <label>Debit</label>
                <input
                  className='addTransactionRadio'
                  type='radio'
                  name='paymentType'
                  id='debit'
                  value={transactionData.debit}
                  onChange={handleRadio}
                />
              <label>Credit</label>
                <input
                  className='addTransactionRadio'
                  type='radio'
                  name='paymentType'
                  id='credit'
                  value={transactionData.credit}
                  onChange={handleRadio}
                />
              <label>Merchant Id</label>
                <input
                  className='addTransactionInput'
                  type='text'
                  name='merchant'
                  value={transactionData.merchant}
                  onChange={onChange}
                />
          <button id='addTransactionButton'>Add</button>
            </form>
        </div>
    )
}

export default AddTransaction;