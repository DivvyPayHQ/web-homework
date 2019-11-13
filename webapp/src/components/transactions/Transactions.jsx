import React, { Fragment, useState, useEffect } from 'react'
import { string } from 'prop-types'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import { useLazyQuery } from '@apollo/react-hooks'

const GET_ADDED_TRANSACTIONS = gql`
  {
    transactions {
      amount
      debit
      credit
      description
      dateAdded
      merchantId: merchant_id
    }
  }
`

const Transactions = ({ categoryType }) => {
  const [editing, toggleEdit] = useState(false)
  const [getAddedTransactions, { data }] = useLazyQuery(GET_ADDED_TRANSACTIONS)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (categoryType) {
      getAddedTransactions({ variables: { category_type: categoryType } })
    }
  }, [categoryType])

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions)
    }
  }, [data])

  return (
    <Fragment>
      <h3>Transactions</h3>
      {transactions.length ? transactions.map((transaction, i) => {
        return (
          <div className='transaction-card' css={transactionStyle} key={i}>
            {editing ? (
              <div className='transaction-card-input-wrapper'>
                <input defaultValue={transaction.description} name='description' onChange={e => console.info(e.target.value)} type='text' />
                <input defaultValue={transaction.amount} name='amount' onChange={e => console.info(e.target.value)} type='number' />
              </div>
            ) : (
              <div className='transaction-wrapper'>
                <div className='transaction-description-wrapper'>
                  <div className='transaction-description'>
                    {transaction.description}
                  </div>
                  {transaction.credit ? (
                    <div className='transaction-amount positive'>
                      ${transaction.amount}
                    </div>
                  ) : (
                    <div className='transaction-amount negative'>
                      -${transaction.amount}
                    </div>
                  )}
                </div>
                <div className='transaction-category-date-wrapper'>
                  <div className='transaction-category'>
                    Category: {transaction.category}
                  </div>
                  <div className='transaction-date'>
                    Date Added: {transaction.dateAdded}
                  </div>
                </div>
              </div>
            )}
            <div className='transaction-actions'>
              {editing
                ? <button className='save-btn' onClick={() => toggleEdit(false)}>SAVE</button>
                : <button className='edit-btn' onClick={() => toggleEdit(true)}>EDIT</button>
              }
              <button className='remove-btn'>REMOVE</button>
            </div>
          </div>
        )
      }) : 'No Transactions uploaded'}
    </Fragment>
  )
}

const transactionStyle = css`
  align-items: center;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  margin: 0 0 15px 0;
  min-height: 45px;

  &:hover,
  &:focus {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
  }

  .transaction-wrapper {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .transaction-description-wrapper {
    min-width: 120px
  }

  .transaction-category-date-wrapper {
    font-size: 14px;
    margin-left: 15px;
  }

  .transaction-description {
    font-size: 20px;
    text-transform: capitalize;
  }

  .transaction-amount {
    font-size: 20px;
    
    &.positive {
      color: #159D6C;
    }

    &.negative {
      color: #9d152f;
    }
  }

  .transaction-actions button {
    appearance: none;
    background-color: #ffffff;
    border: 1px solid #000;
    border-radius: 3px;
    font-family: 'Calibre-Med';
    font-size: 13px;
    padding: 8px 15px;

    &.remove-btn {
      &:hover,
      &:focus {
        background-color: #9d152f;
        border: 1px solid #9d152f;
        color: #ffffff;
        cursor: pointer;
      }
    }

    &.save-btn {
      &:hover,
      &:focus {
        background-color: #159D6C;
        border: 1px solid #159D6C;
        color: #ffffff;
        cursor: pointer;
      }
    }

    &:hover,
    &:focus {
      background-color: #000000;
      color: #ffffff;
      cursor: pointer;
    }

    &:first-of-type {
      margin-right: 10px;
    }
  }

  .transaction-card-input-wrapper {
    > input {
      border-radius: 3px;
      border: 1px solid #626262;
      font-size: 14px;
      padding: 8px 15px;
      margin-right: 15px;
    }
  }
`

Transactions.propTypes = {
  categoryType: string.isRequired
}

export default Transactions
