import React from 'react'
import { css } from '@emotion/core'

import Transactions from '../transactions/Transactions'
import AddTransaction from '../transactions/AddTransaction'
import TotalValue from '../totalValue/TotalValue'
import Chart from '../chart/Chart'

const Dashboard = () => {
  return (
    <div className='dashboard-wrapper'>
      <div className='total-value-chart-wrapper' css={totalValueChartWrapper}>
        <TotalValue />
        <Chart />
      </div>
      <div className='transactions-add-transaction-wrapper' css={transactionsWrapper}>
        <Transactions />
        <AddTransaction />
      </div>
    </div>
  )
}

const totalValueChartWrapper = css`
  display: grid;
  grid-column-gap: 15px;
  grid-template-columns: 30% 69%;
`

const transactionsWrapper = css`
  display: grid;
  grid-column-gap: 15px;
  grid-template-columns: 60% 39%;
`

export default Dashboard
