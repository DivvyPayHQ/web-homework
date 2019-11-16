import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_ADDED_TRANSACTIONS = gql`
  {
    transactions {
      amount
      debit
      credit
    }
  }
`

const AddTransaction = () => {
  const [openForm, toggleForm] = useState(false)
  const { data } = useQuery(GET_ADDED_TRANSACTIONS)

  console.info(data)

  useEffect(() => {

  }, [])

  return (
    <div className='add-transaction-wrapper' css={addTransactionStyle}>
      <button className='add-transaction-btn' onClick={() => toggleForm(!openForm)}>
        + Add Transaction
      </button>
      {openForm && (
        <form className='add-transaction-form'>
          <label htmlFor='amount'>Amount:</label>
          <input id='amount' name='amount' type='number' />
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

  .add-transaction-form {
    background-color: #ffffff;
    padding: 20px;
    margin: 20px 0;
  }
`

export default AddTransaction
