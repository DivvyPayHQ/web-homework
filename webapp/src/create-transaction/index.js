import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router'
import { css } from '@emotion/core'

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
    <form css={formStyle} onSubmit={(event) => {
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
      <label>
        Merchant Id:
        <input onChange={({ target: { value } }) => setMerchantId(value)} type='number' value={merchantId} />
      </label>
      <label>
        User Id:
        <input onChange={({ target: { value } }) => setUserId(value)} value={userId} />
      </label>
      <label>
        Amount:
        <input onChange={({ target: { value } }) => setAmount(value)} type='number' value={amount} />
      </label>
      <label>
        Credit:
        <input checked={isCredit} onChange={() => setIsCredit(!isCredit)} type='checkbox' />
      </label>
      <label>
        Debit:
        <input checked={isDebit} onChange={() => setIsDebit(!isDebit)} type='checkbox' />
      </label>
      <label>
        Description:
        <input onChange={({ target: { value } }) => setDescription(value)} value={description} />
      </label>
      <button>Create Transaction</button>
    </form>
  )
}

export default withRouter(CreateTransaction)

const formStyle = css`
  border-radius: 8px;
  border: solid 1px black;
  display: grid;
  grid-gap: 16px;
  padding: 12px;
`
