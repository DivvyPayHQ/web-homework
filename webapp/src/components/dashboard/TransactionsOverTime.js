import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { css } from '@emotion/core'
import { BarChart } from '@kyper/graphs'
import { useTokens } from '@kyper/tokenprovider'
import { Spinner } from '@kyper/progressindicators'
import _groupBy from 'lodash/groupBy'

import { ErrorView } from 'src/components/shared/ErrorView'

import { SettingsContext } from 'src/context/SettingsContext'

import { convertToRoman } from 'src/utils/numbers'

export function buildChartData (transactions) {
  const grouped = _groupBy(transactions, 'date')

  return Object.keys(grouped).map(key => ({
    label: key,
    value: grouped[key].length
  }))
}

export function TransactionsOverTime ({ height, error, loading, transactions, width }) {
  const { showRomanNumerals } = useContext(SettingsContext).options
  const tokens = useTokens()

  const data = buildChartData(transactions)

  if (loading) {
    return <Spinner fgColor={tokens.Color.Brand300} size={80} />
  }

  if (error) {
    return (<ErrorView />)
  }

  return (
    <div css={containerStyle(tokens)} style={{ height, width }}>
      <h3>Transactions Over Time </h3>
      <BarChart
        colorRange={[tokens.Color.Blue]}
        data={data}
        enableYGrid
        height={height - 200}
        labelFormatter={(val) => showRomanNumerals ? convertToRoman(val) : val}
        margins={{
          left: 50,
          top: 50,
          right: 50,
          bottom: 50
        }}
        svgProps={{
          style: {
            backgroundColor: 'black'
          }
        }}
        threshold={300}
        width={width}
        yFormatter={(val) => showRomanNumerals ? convertToRoman(val) : val}
      />
    </div>
  )
}

TransactionsOverTime.propTypes = {
  error: PropTypes.object,
  height: PropTypes.number,
  loading: PropTypes.bool,
  transactions: PropTypes.array,
  width: PropTypes.number
}

const containerStyle = tokens => css`
  padding-top: ${tokens.Spacing.XLarge}px;

  h3 {
    font-size: 30px;
  }

  /* I haven't added dark mode to the barchart yet */

  & .mx-bar-label-background {
    fill: black !important;
  }

  & .mx-bar-label-background + text {
    fill: ${tokens.Color.Brand300} !important;
  }
`
