import React from 'react'
import { css } from '@emotion/core'

import Transactions from '../transactions/Transactions'
import AddTransaction from '../transactions/AddTransaction'
import TotalValue from '../totalValue/TotalValue'

const Dashboard = () => {
  return (
    <div className='dashboard-wrapper' css={dashboardStyle}>
      <TotalValue />
      <Transactions />
      <AddTransaction />
    </div>
  )
}

const dashboardStyle = css`
`

export default Dashboard
