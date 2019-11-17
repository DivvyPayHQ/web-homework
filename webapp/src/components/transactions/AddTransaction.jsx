import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const ADD_TRANSACTION = gql`
  mutation(
    $amount: Float!
    $debit: Boolean!
    $credit: Boolean!
    $description: String!
    $merchant_id: String!
    $dateAdded: String!
    $transactionId: String!
    $category: String!
  ) {
    addTransaction(
      amount: $amount
      debit: $debit
      credit: $credit
      description: $description
      merchant_id: $merchant_id
      dateAdded: $dateAdded
      transactionId: $transactionId
      category: $category
    ) {
      amount
      debit
      credit
      description
      merchant_id
      dateAdded
      transactionId
      category
    }
  }
`

const AddTransaction = () => {
  const [openForm, toggleForm] = useState(false)
  const [addTransaction, { data }] = useMutation(ADD_TRANSACTION)

  console.info(data, addTransaction)

  useEffect(() => {

  }, [])

  return (
    <div className='add-transaction-wrapper' css={addTransactionStyle}>
      <button className='add-transaction-btn' onClick={() => toggleForm(!openForm)}>
        {openForm ? '-' : '+'} Add Transaction
      </button>
      {openForm && (
        <form className='add-transaction-form' css={addTransactionForm}>
          <div className='input-wrapper'>
            <label htmlFor='amount'>Amount</label>
            <input id='amount' name='amount' type='number' />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='description'>Description</label>
            <input id='description' name='description' type='text' />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='category'>Category</label>
            <input id='category' name='category' type='text' />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='merchant_id'>Merchant ID</label>
            <input id='merchant_id' name='merchant_id' type='text' />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='dateAdded'>Date</label>
            <input id='dateAdded' name='dateAdded' type='date' />
          </div>
          <div className='input-wrapper debit-credit-wrapper'>
            <label htmlFor='credit'>Credit</label>
            <input id='credit' name='credit-debit' type='radio' value='credit' />
            <label htmlFor='debit'>Debit</label>
            <input id='debit' name='credit-debit' type='radio' value='debit' />
          </div>
        </form>
      )}
    </div>
  )
}

const addTransactionStyle = css`
  margin-top: 10px;

  .add-transaction-btn {
    appearance: none;
    background-color: #ffffff;
    border: none;
    border-radius: 3px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
    font-family: 'Calibre-Regular';
    font-size: 18px;
    padding: 8px 15px;

    &:hover,
    &:focus {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
      cursor: pointer;
    }
  }
`

const addTransactionForm = css`
  background-color: #ffffff;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 20px;
  margin: 20px 0;
  width: 50%;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }

  .debit-credit-wrapper {
    display: flex;
    justify-content: space-between;
  }

  input {
    border-radius: 3px;
    border: 1px solid #aeada8;
    font-size: 14px;
    padding: 8px 15px;
    margin-right: 15px;
  }
`

export default AddTransaction
