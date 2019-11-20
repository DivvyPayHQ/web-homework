import React, { Fragment, useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import EditTransaction from './EditTransaction'
import { GET_ADDED_TRANSACTIONS, DELETE_TRANSACTION } from '../../queries/queries'

const Transactions = () => {
  const [showEditFormId, setEditFormShow] = useState('')
  const [getAddedTransactions, { data }] = useLazyQuery(
    GET_ADDED_TRANSACTIONS,
    {
      pollInterval: 200
    }
  )
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)
  const [transactions, setTransactions] = useState([])
  const handleDeletion = (transactionId) => deleteTransaction({ variables: { transactionId } })

  useEffect(() => {
    getAddedTransactions()
  }, [])

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions)
    }
  }, [data])

  return (
    <div className='transactions-container'>
      <h3>Transactions</h3>
      {transactions.length ? transactions.map((transaction, i) => {
        return (
          <Fragment key={i}>
            <div className='transaction-card' css={transactionStyle}>
              <div className='transaction-wrapper'>
                <div className='transaction-description-wrapper' css={transactionWrapperStyle}>
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
                    Category: <span>{transaction.category}</span>
                  </div>
                  <div className='transaction-date'>
                    Date Added: {transaction.dateAdded}
                  </div>
                </div>
              </div>
              <div className='transaction-actions'>
                {showEditFormId !== transaction.transactionId ? (
                  <button className='edit-btn' css={transactionActionsBtnStyle} onClick={() => setEditFormShow(transaction.transactionId)}>EDIT</button>
                ) : (
                  <button className='cancel-btn' css={transactionActionsBtnStyle} onClick={() => setEditFormShow('')}>CANCEL</button>
                )}
                <button className='remove-btn' css={transactionActionsBtnStyle} onClick={() => handleDeletion(transaction.transactionId)}>REMOVE</button>
              </div>
            </div>
            <EditTransaction
              amount={transaction.amount}
              category={transaction.category}
              credit={transaction.credit}
              dateAdded={transaction.dateAdded}
              debit={transaction.debit}
              description={transaction.description}
              merchantId={transaction.merchantId}
              setEditFormShow={setEditFormShow}
              showEditFormId={showEditFormId}
              transactionId={transaction.transactionId}
            />
          </Fragment>
        )
      }) : 'No Transactions uploaded'}
    </div>
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

  .transaction-category > span {
    text-transform: capitalize;
  }
`

const transactionWrapperStyle = css`
  min-width: 150px;

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
`

const transactionActionsBtnStyle = css`
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #000;
  border-radius: 3px;
  font-family: 'Calibre-Med';
  font-size: 13px;
  padding: 8px 15px;

  &:hover {
    background-color: #000000;
    color: #ffffff;
    cursor: pointer;
  }

  &:first-of-type {
    margin-right: 10px;
  }

  &.cancel-btn,
  &.remove-btn {
    &:hover {
      background-color: #9d152f;
      border: 1px solid #9d152f;
      color: #ffffff;
      cursor: pointer;
    }
  }

  &.edit-btn {
    &:hover {
      background-color: #159D6C;
      border: 1px solid #159D6C;
      color: #ffffff;
      cursor: pointer;
    }
  }
`

export default Transactions
