import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router'

const CREATE_TRANSACTION = gql`
  mutation AddTransaction(
    $userId: String
    $description: String
    $merchantId: String
    $isDebit: Boolean
    $isCredit: Boolean
    $amount: Float
  ) {
    addTransaction(
      user_id: $userId
      description: $description
      merchant_id: $merchantId
      debit: $isDebit
      credit: $isCredit
      amount: $amount
    ) {
      user_id
      description
      merchant_id
      debit
      credit
      amount
      id
    }
  }
`

export const CreateTransaction = () => {
  const [createTransaction] = useMutation(CREATE_TRANSACTION)
  const [amount, setAmount] = useState('')
  const [isCredit, setIsCredit] = useState(false)
  const [isDebit, setIsDebit] = useState(false)
  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [description, setDescription] = useState('')

  return (
    <form onSubmit={(event) => {
      event.preventDefault()

      createTransaction({
        variables: {
          amount: parseFloat(amount),
          isCredit,
          isDebit,
          description,
          merchantId,
          userId
        }
      })
    }}>
      <div>Merchant Id:</div>
      <input onChange={({ target: { value } }) => setMerchantId(value)} type='number' value={merchantId} />
      <div>User Id:</div>
      <input onChange={({ target: { value } }) => setUserId(value)} value={userId} />
      <div>Amount:</div>
      <input onChange={({ target: { value } }) => setAmount(value)} type='number' value={amount} />
      <div>Credit:</div>
      <input checked={isCredit} onChange={() => setIsCredit(!isCredit)} type='checkbox' />
      <div>Debit:</div>
      <input checked={isDebit} onChange={() => setIsDebit(!isDebit)} type='checkbox' />
      <div>Description:</div>
      <input onChange={({ target: { value } }) => setDescription(value)} value={description} />
      <button>Submit</button>
    </form>
  )
}

export default withRouter(CreateTransaction)
