import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { css } from '@emotion/core'

import { Card } from 'src/components/dashboard/Card'
import { NumberSpinner } from 'src/components/dashboard/NumberSpinner'

import { SettingsContext } from 'src/context/SettingsContext'

// These can be abstracted to a single dashboard card.
export function UsersCount ({ error, loading, transactions = [] }) {
  const { showRomanNumerals } = useContext(SettingsContext).options
  const users = [...new Set(transactions.map(transaction => transaction.user))]

  return (
    <Card color='Blue' css={cardStyle}>
      <h3>
        Total Users
      </h3>

      {!error && !loading && (
        <NumberSpinner duration={1000} end={users.length} showRomanNumerals={showRomanNumerals} />
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
