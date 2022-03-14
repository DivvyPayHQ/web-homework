import React from 'react'
import { bool } from 'prop-types'
import { PieChart } from 'react-minimal-pie-chart'
import { GetTransactions } from '../../gql/transactions.gql'
import { useQuery } from '@apollo/client'
import { css } from '@emotion/core'
import { gibberishConverter } from '../../utils/i18nConverter'

export function PieChartPage ({ convertRoman }) {
  const isI18nEnabled = window.location.search.includes('i18n=true')
  let merchantArray = []
  let userArray = []
  const { loading, data = {} } = useQuery(GetTransactions, {
    fetchPolicy: 'network-only'
  })

  function profitBuilder (id) {
    let dataProfits = {}
    data.transactions.forEach(transaction => {
      !(transaction[id] in dataProfits) && (dataProfits[transaction[id]] = {})
      if (dataProfits[transaction[id]].amount) {
        dataProfits[transaction[id]].amount += transaction.amount
      } else {
        dataProfits[transaction[id]].amount = transaction.amount
      }
    })
    return dataProfits
  }

  if (loading) {
    return (
      <div>
            Loading...
      </div>
    )
  } else {
    let merchantsProfits = profitBuilder('merchant_id')
    for (const property in merchantsProfits) {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
      merchantArray.push({ title: `${property}`, value: merchantsProfits[property].amount, color: `#${randomColor}` })
    }
    let userSpending = profitBuilder('user_id')
    for (const property in userSpending) {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
      userArray.push({ title: `${property}`, value: userSpending[property].amount, color: `#${randomColor}` })
    }
  }

  return (
    <div css={pieContainer}>
      <div className='title-chart'>
        <div className='pie-title'>{gibberishConverter(`Profits of Merchants`, isI18nEnabled)}</div>
        <PieChart
          animate
          animationEasing='ease-out'
          data={merchantArray}
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
      <div className='title-chart'>
        <div className='pie-title'>{gibberishConverter(`Biggest Spenders`, isI18nEnabled)}</div>
        <PieChart
          animate
          animationEasing='ease-out'
          data={userArray}
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
    </div>

  )
}

PieChartPage.propTypes = {
  convertRoman: bool
}

const pieContainer = css`
    display: flex;
    width: 75%;
    justify-content: center;
    margin-top: 35px;

    .title-chart {
      display: flex;
    flex-direction: column;
    align-items: center;
    }

    .pie-title {
      padding: 15px;
      font-weight: bold;
    }
`
