import React from 'react'
import { css } from '@emotion/core'

import Transactions from '../transactions/Transactions'

const Dashboard = () => {
  return (
    <div className='dashboard-wrapper' css={dashboardStyle}>
      <Transactions categoryType='car' />
    </div>
  )
}

const dashboardStyle = css`
`

export default Dashboard
