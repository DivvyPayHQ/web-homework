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

const TotalValue = () => {
  const [totalValue, setTotalValue] = useState('')
  const { data } = useQuery(GET_ADDED_TRANSACTIONS)

  useEffect(() => {
    if (data && data.transactions) {
      let total = 0
      data.transactions.forEach(t => {
        if (t.credit) {
          total += t.amount
        } else if (t.debit) {
          total -= t.amount
        }

        return total
      })

      setTotalValue(total)
    }
  }, [data])

  return (
    <div className='total-value-wrapper' css={totalValueStyle}>
      <span className='total-value-text'>Total Value:</span>
      <span className={`total-value ${totalValue > 0 ? 'positive' : 'negative'}`}>${totalValue}</span>
    </div>
  )
}

const totalValueStyle = css`
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  height: 100px;
  flex-direction: column;
  font-size: 18px;
  justify-content: center;
  padding-left: 40px;
  width: 25%;

  .total-value {
    font-size: 30px;

    &.positive {
      color: #159D6C;
    }

    &.negative {
      color: #9d152f;
    }
  }
`

export default TotalValue
