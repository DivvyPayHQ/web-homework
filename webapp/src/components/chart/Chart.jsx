import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

import { buildDataForChart } from '../../helpers/helpers'
import { GET_ADDED_TRANSACTIONS } from '../../queries/queries'

const Chart = () => {
  const [chartData, setChartData] = useState()
  const { data } = useQuery(GET_ADDED_TRANSACTIONS)

  useEffect(() => {
    if (data && data.transactions) {
      const builtDataForChart = buildDataForChart(data.transactions)
      setChartData(builtDataForChart)
    }
  }, [data])

  return (
    <div className='pie-chart-wrapper' css={chartWrapperStyle}>
      <h4>What you&apos;re spending your money on: </h4>
      <BarChart
        data={chartData}
        height={150}
        margin={{
          top: 5, right: 20, left: 20, bottom: 5
        }}
        width={500}
      >
        <XAxis dataKey='category' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='amount' fill='#9d152f' />
      </BarChart>
    </div>
  )
}

const chartWrapperStyle = css`
  align-items: center;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 200px;

  h4 {
    margin: 10px 0 10px 40px;
  }
`

export default Chart
