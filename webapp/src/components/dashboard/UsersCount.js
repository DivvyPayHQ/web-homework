import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'

import { Card } from 'src/components/dashboard/Card'
import { NumberSpinner } from 'src/components/dashboard/NumberSpinner'

export function UsersCount ({ error, loading, transactions = [] }) {
  const users = [...new Set(transactions.map(transaction => transaction.user_id))]

  return (
    <Card color='blue' css={cardStyle}>
      <h3>
        User Count
      </h3>

      {!error && !loading && (
        <NumberSpinner duration={1000} end={users.length} />
      )}
    </Card>
  )
}

UsersCount.propTypes = {
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
