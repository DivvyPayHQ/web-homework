import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { Card } from 'src/components/dashboard/Card'
import { NumberSpinner } from 'src/components/dashboard/NumberSpinner'

import { SettingsContext } from 'src/context/SettingsContext'

export function TransactionsCount ({ error, loading, transactions = [] }) {
  const { showRomanNumerals } = useContext(SettingsContext).options

  return (
    <Card color='Green' css={cardStyle}>
      <h3>
        Total Transactions
      </h3>

      {!error && !loading && (
        <NumberSpinner duration={1000} end={transactions.length} showRomanNumerals={showRomanNumerals} />
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
