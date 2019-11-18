import React from 'react'
import { css } from '@emotion/core'

import Transactions from '../transactions/Transactions'
import AddTransaction from '../transactions/AddTransaction'
import TotalValue from '../totalValue/TotalValue'
import PieChart from '../pieChart/PieChart'

const Dashboard = () => {
  return (
    <div className='dashboard-wrapper'>
      <div className='top-info-bar-wrapper' css={topInfoStyle}>
        <TotalValue />
        <PieChart />
      </div>
      <Transactions />
      <AddTransaction />
    </div>
  )
}

const topInfoStyle = css`
  display: flex;
`

export default Dashboard
