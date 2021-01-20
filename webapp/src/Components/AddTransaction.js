import React, { Component, useEffect, useState } from 'react'
import { Query, compose, graphql } from 'react-apollo'
import { addTransactionQuery, getTransactionQuery, updateTransaction } from '../queries/queries'

const AddTransaction = props => {
  const [Id, setId] = useState('')
  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [transactionType, setTransactionType] = useState('')

  useEffect(() => {
    if (props.transaction) {
      setId(props.transaction.id)
      setUserId(props.transaction.user_id)
      setMerchantId(props.transaction.merchant_id)
      setAmount(props.transaction.amount)
      setDescription(props.transaction.description)
      setTransactionType(GetTransactionType(props.transaction))
    }
  }, [])

  const GetTransactionType = transaction => {
    if (transaction?.debit === true) {
      return 'debit'
    }
    else {
      return 'credit'
    }
  }
  
  const randomCode = () => {
    return Math.random()
      .toString(36)
      .substr(2, 9)
  }
  
  const handleSubmit = e => {
    e.preventDefault()
    // console.log(
    //   `You have submitted the form.${userId} ${amount} ${merchantId} ${debit} ${credit} ${description} ${transactionType}`
    // )
    if (props.editTransaction) {
      //debugger;
      console.log("Editing transaction...")

      props.updateTransaction({
        variables: {
          transaction: {
            id: Id,
            user_id: userId,
            merchant_id: merchantId,
            debit: transactionType === 'debit',
            credit: transactionType === 'credit',
            amount: amount,
            description: description
          }
        }
      })
      
      // props.toggleEdit()
    } else {
      console.log("Adding transaction...")
      props.addTransactionQuery({
        variables: {
          user_id: randomCode(),
          merchant_id: randomCode(),
          debit: transactionType === 'debit',
          credit: transactionType === 'credit',
          amount: amount,
          description: description
        },
        refetchQueries: [{ query: getTransactionQuery }]
      })
    }
  }

  if (props.editTransaction) {
      console.log({
      user_id: userId,
      merchant_id: merchantId,
      debit: transactionType === 'debit',
      credit: transactionType === 'credit',
      amount: amount,
      description: description
    })
  }

  const test = (e) => {
    console.log("value => ", e.target.value);
    console.log("parsed value => ", parseFloat(e.target.value));
    setAmount(e.target.value != '' ? parseFloat(e.target.value) : 0)
  }

  return (
    <div>
      <form id='add-trans' onSubmit={handleSubmit}>
        {/* <div className='field'>
          <label>User ID: </label>
          <input onChange={e => setUserId(e.target.value)} type='text' value={userId} />
        </div> */}

        {/* <div className='field'>
          <label>Merchant ID: </label>
          <input onChange={e => setMerchantId(e.target.value)} type='text' value={merchantId} />
        </div> */}

        <div className='field'>
          <label>Description: </label>
          <input onChange={e => setDescription(e.target.value)} type='text' value={description} />
        </div>  

        <div className='field'>
          <label>Amount: </label>
          <input
            onChange={e => test(e)}
            type='text'
            value={amount}
          />
        </div>

        <div className='field'>
          <label />
          <select
            value={transactionType}
            onChange={e => setTransactionType(e.target.value)}
          >
            <option label='Debit' value='debit'>
              debit
            </option>
            <option label='Credit' value='credit'>
              credit
            </option>
          </select>
        </div>
        <button>{props.editTransaction ? 'Edit' : 'Add'}</button>
      </form>
    </div>
  )
}

export default compose(
  graphql(addTransactionQuery, { name: 'addTransactionQuery' }),
  graphql(updateTransaction, { name: 'updateTransaction' })
)(AddTransaction)
// export default graphql(addTransactionQuery, { name: 'addTransactionQuery' })(AddTransaction)
