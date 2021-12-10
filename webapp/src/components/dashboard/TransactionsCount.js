import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'

import { Card } from 'src/components/dashboard/Card'
import { NumberSpinner } from 'src/components/dashboard/NumberSpinner'

export function TransactionsCount ({ error, loading, transactions = [] }) {
  return (
    <Card color='green' css={cardStyle}>
      <h3>
        Total Transactions
      </h3>

      {!error && !loading && (
        <NumberSpinner duration={1000} end={transactions.length} />
      )}
    </Card>
  )
}

TransactionsCount.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  transactions: PropTypes.array
}

const cardStyle = css`
  text-align: center;

  & > span {
    font-size: 72px;
  }
`
