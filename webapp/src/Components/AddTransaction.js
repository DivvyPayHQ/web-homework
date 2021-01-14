import React, { Component, useState } from 'react'
import gql from 'graphql-tag'
import { Query, compose, graphql } from 'react-apollo'
// import { getTransactionQuery } from '../queries/queries'
import { addTransactionQuery } from '../queries/queries'

// const getTransactionQuery = gql`
//   {
//     transactions {
//       debit
//       credit
//     }
//   }
// `

// const addTransactionQuery = gql`
//   mutation(
//     $user_id: String!
//     $description: String!
//     $merchant_id: String!
//     $debit: Boolean
//     $credit: Boolean
//     $amount: Float
//   ) {
//     addTransaction(
//       user_id: $user_id
//       description: $description
//       merchant_id: $merchant_id
//       debit: $debit
//       credit: $credit
//       amount: $amount
//     ) {
//       description
//       id
//     }
//   }
// `

const AddTransaction = (props) => {
  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [transactionType, setTransactionType] = useState('')

  // const newTransaction = {
  //   userId,
  //   merchantId,
  //   debit,
  //   year,
  //   credit,
  //   amount
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      `You have submitted the form.${userId} ${amount} ${merchantId} ${debit} ${credit} ${description} ${transactionType}`
    )

    // console.log(transactionType)


    console.log({
      user_id: randomCode(),
      merchant_id: merchantId,
      debit: transactionType === 'debit',
      credit: transactionType === 'credit',
      amount: amount,
      description: description,
    })

    props.addTransactionQuery({
      variables: {
        user_id: randomCode(),
        merchant_id: merchantId,
        debit: transactionType === 'debit',
        credit: transactionType === 'credit',
        transactionType: transactionType,
        amount: amount,
        description: description
      }
    })
  }

  const randomCode = () => {
    return  Math.random().toString(36).substr(2, 9);
  }
 

  return (
    <div>
      <form id='add-trans' onSubmit={handleSubmit}>
        <div className='field'>
          <label>User ID: </label>
          <input onChange={(e) => setUserId(e.target.value)} type='text' />
        </div>

        <div className='field'>
          <label>Merchant ID: </label>
          <input onChange={(e) => setMerchantId(e.target.value)} type='text' />
        </div>

        {/* <div className="field">
          <label>Debit</label>
          <input type="text"
            onChange={(e) => setDebit(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Credit</label>
          <input type="text"
            onChange={(e) => setCredit(e.target.value)}
          />
        </div> */}

        <div className='field'>
          <label>Amount: </label>
          <input onChange={(e) => setAmount(e.target.value != '' ? parseFloat(e.target.value) : 0)} type='text' />
        </div>

        <div className='field'>
          <label>Description: </label>
          <input onChange={(e) => setDescription(e.target.value)} type='text' />
        </div>

        <div className='field'>
          <label />
          <select onChange={(e) => setTransactionType(e.target.value)}>
            <option label='Debit' value="debit" >
              debit
            </option>
            <option label='Credit' value="credit">
              credit
            </option>
          </select>
        </div>
        <button>+</button>
      </form>
    </div>
  )
}

// export default compose(
//   graphql(addTransactionQuery, { name: "addTransactionQuery" })

// )(AddTransaction);
export default graphql(addTransactionQuery, { name: 'addTransactionQuery' })(AddTransaction)
