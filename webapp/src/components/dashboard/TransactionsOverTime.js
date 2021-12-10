import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/core'
import { BarChart } from '@kyper/graphs'
import { useTokens } from '@kyper/tokenprovider'
import { Spinner } from '@kyper/progressindicators'

import { ErrorView } from 'src/components/shared/ErrorView'

export function buildChartData (transactions) {
  return null
}

export function TransactionsOverTime ({ error, loading, transactions }) {
  const tokens = useTokens()

  if (loading) {
    return <Spinner fgColor={tokens.Color.Brand300} size={80} />
  }

  if (error) {
    return (<ErrorView />)
  }

  return (
    <div css={containerStyle(tokens)}>
      <h3>Transactions over time</h3>
      <BarChart
        colorRange={[tokens.Color.Blue]}
        data={[
          {
            ariaLabel: '',
            label: 'Jan',
            value: 300
          },
          {
            label: 'Feb',
            value: 245
          },
          {
            label: 'Mar',
            value: 50
          },
          {
            label: 'Apr',
            value: 300
          },
          {
            label: 'May',
            value: 500
          },
          {
            label: 'Jun',
            value: 200
          }
        ]}
        height={300}
        svgProps={{
          style: {
            backgroundColor: 'black'
          }
        }}
        threshold={300}
        width={500}
      />
    </div>
  )
}

TransactionsOverTime.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  transactions: PropTypes.array
}

const containerStyle = tokens => css`
  /* I haven't added dark mode to the barchart yet */

  & .mx-bar-label-background {
    fill: black !important;
  }

  & .mx-bar-label-background + text {
    fill: ${tokens.Color.Brand300} !important;
  }
`
