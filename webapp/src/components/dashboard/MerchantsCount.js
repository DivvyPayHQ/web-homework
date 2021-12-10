import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'

import { Card } from 'src/components/dashboard/Card'
import { NumberSpinner } from 'src/components/dashboard/NumberSpinner'

export function MerchantsCount ({ error, loading, transactions = [] }) {
  const merchants = [...new Set(transactions.map(transaction => transaction.merchant_id))]

  return (
    <Card css={cardStyle}>
      <h3>
        Total Merchants
      </h3>

      {!error && !loading && (
        <NumberSpinner duration={1000} end={merchants.length} />
      )}
    </Card>
  )
}

MerchantsCount.propTypes = {
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
