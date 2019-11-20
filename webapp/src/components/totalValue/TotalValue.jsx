import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'

import { calculateTotalValue } from '../../helpers/helpers'
import { GET_ADDED_TRANSACTIONS } from '../../queries/queries'

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
    <div className='total-value' css={totalValueContainer}>
      <div className='total-value-wrapper' css={totalValueStyle}>
        <span className='total-value-text'>Balance:</span>
        <span className={`total-value ${totals.totalValue > 0 ? 'positive' : 'negative'}`}>${totals.totalValue}</span>
        <div className='credit-debit-wrapper'>
          <span className='credit-total'>Credits: ${totals.creditTotal}</span>
          <span className='debit-total'>Debits: ${totals.debitTotal}</span>
        </div>
      </div>
    </div>
  )
}

const totalValueContainer = css`
  align-items: center;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  height: 200px;
`

const totalValueStyle = css`
  display: flex;
  flex-direction: column;
  font-size: 24px;
  justify-content: center;
  margin-right: 10px;
  padding: 0 30px 5px;

  .total-value {
    font-size: 44px;
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
    font-size: 14px;
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
