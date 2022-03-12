import React from 'react'
import { bool } from 'prop-types'
import { PieChart } from 'react-minimal-pie-chart'
import { GetTransactions } from '../../gql/transactions.gql'
import { useQuery } from '@apollo/client'
import { css } from '@emotion/core'
import { gibberishConverter } from '../../utils/i18nConverter'

export function PieChartPage ({ convertRoman }) {
  const isI18nEnabled = window.location.search.includes('i18n=true')
  let dataArray = []
  const { loading, data = {} } = useQuery(GetTransactions, {
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return (
      <div>
            Loading...
      </div>
    )
  } else {
    let merchantsProfits = {}
    data.transactions.forEach(transaction => {
      !(transaction.merchant_id in merchantsProfits) && (merchantsProfits[transaction.merchant_id] = {})
      if (merchantsProfits[transaction.merchant_id].amount) {
        merchantsProfits[transaction.merchant_id].amount += transaction.amount
      } else {
        merchantsProfits[transaction.merchant_id].amount = transaction.amount
      }
    })
    for (const property in merchantsProfits) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
      dataArray.push({ title: `${property}`, value: merchantsProfits[property].amount, color: `#${randomColor}` })
    }
  }

  return (
    <div css={pieContainer}>
      <div>{gibberishConverter(`Profits of Merchants`, isI18nEnabled)}</div>
      <PieChart
        animate
        animationEasing='ease-out'
        data={dataArray}
        label={({ dataEntry }) =>
          gibberishConverter(`${dataEntry.title}`, isI18nEnabled)
        }
        labelPosition={63}
        labelStyle={{
          fontSize: '5px',
          fill: 'black'
        }}

      />
    </div>
  )
}

PieChartPage.propTypes = {
  convertRoman: bool
}

const pieContainer = css`
    display: flex;
    width: 70%;
`
