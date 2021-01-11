import React, { Component, useState } from 'react'
import gql from 'graphql-tag'
import { Query, compose, graphql } from 'react-apollo'
// import { addTransactionQuery } from "../queries/queries"

// const getTransactionQuery = gql`
//   {
//     transactions {
//       debit
//       credit
//     }
//   }
// `

const addTransactionQuery = gql`
  mutation(
    $user_id: String!
    $description: String!
    $merchant_id: String!
    $debit: Boolean
    $credit: Boolean
    $amount: Float
  ) {
    addTransaction(
      user_id: $user_id
      description: $description
      merchant_id: $merchant_id
      debit: $debit
      credit: $credit
      amount: $amount
    ) {
      description
      id
    }
  }
`

const AddTransaction = () => {
  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

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
    alert(`You have submitted the form.${userId} ${amount} ${merchantId} ${debit} ${credit} ${description}`)
    addTransactionQuery()
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
          <input onChange={(e) => setAmount(e.target.value)} type='text' />
        </div>

        <div className='field'>
          <label>Description: </label>
          <input onChange={(e) => setDescription(e.target.value)} type='text' />
        </div>

        <div className='field'>
          <label />
          <select>
            <option onChange={(e) => setDebit(e.target.value)}>Debit: </option>
            <option onChange={(e) => setCredit(e.target.value)}>credit: </option>
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
export default AddTransaction
