import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { calculateTotalValue } from '../../helpers/helpers'

const GET_ADDED_TRANSACTIONS = gql`
  {
    transactions {
      amount
      debit
      credit
    }
  }
`

const TotalValue = () => {
  const [totals, setTotalValue] = useState({})
  const { data } = useQuery(GET_ADDED_TRANSACTIONS)

  useEffect(() => {
    if (data && data.transactions) {
      const totalValue = calculateTotalValue(data.transactions)

      setTotalValue(totalValue)
    }
  }, [data])

  return (
    <div className='total-value-wrapper' css={totalValueStyle}>
      <span className='total-value-text'>Expenses:</span>
      <span className={`total-value ${totals.totalValue > 0 ? 'positive' : 'negative'}`}>${totals.totalValue}</span>
      <div className='credit-debit-wrapper'>
        <span className='credit-total'>Credits: ${totals.creditTotal}</span>
        <span className='debit-total'>Debits: ${totals.debitTotal}</span>
      </div>
    </div>
  )
}

const totalValueStyle = css`
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  height: 120px;
  flex-direction: column;
  font-size: 18px;
  justify-content: center;
  margin-right: 10px;
  padding: 0 40px 5px;
  width: 50%;

  .total-value {
    font-size: 36px;
    margin: 5px 0 7px;

    &.positive {
      color: #159D6C;
    }

    &.negative {
      color: #9d152f;
    }
  }

  .credit-debit-wrapper {
    display: flex;
  }

  .credit-total,
  .debit-total {
    border-radius: 3px;
    color: #ffffff;
    font-size: 13px;
    margin-right: 5px;
    padding: 3px 5px;
  }

  .credit-total {
    background-color: #159D6C;
  }

  .debit-total {
    background-color: #9d152f;
  }
`

export default TotalValue
