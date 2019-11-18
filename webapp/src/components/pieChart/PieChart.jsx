import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import MinimalPieChart from 'react-minimal-pie-chart'

import { calculateTotalValue } from '../../helpers/helpers'

const GET_ADDED_TRANSACTIONS = gql`
  {
    transactions {
      amount
      debit
      credit
    }
  }
`

const PieChart = () => {
  const [chartData, setChartData] = useState()
  const { data } = useQuery(GET_ADDED_TRANSACTIONS)

  useEffect(() => {
    if (data && data.transactions) {
      const totalValue = calculateTotalValue(data.transactions)
      const buildDataForChart = [{
        color: '#E38627',
        title: 'Credit',
        value: totalValue.creditTotal
      },
      {
        color: '#C13C37',
        title: 'Debit',
        value: Math.abs(totalValue.debitTotal)
      }]
      setChartData(buildDataForChart)
    }
  }, [data])

  console.info('chartData', chartData)

  // [
  //   {
  //     color: '#E38627',
  //     title: 'Credit',
  //     value: 10
  //   },
  //   {
  //     color: '#C13C37',
  //     title: 'Debit',
  //     value: 15
  //   }
  // ]

  return (
    <div className='pie-chart-wrapper' css={chartWrapperStyle}>
      <MinimalPieChart
        animate={false}
        animationDuration={500}
        animationEasing='ease-out'
        cx={50}
        cy={50}
        data={chartData}
        label
        labelPosition={50}
        labelStyle={{
          fill: '#000000',
          fontFamily: 'inherit',
          fontSize: '8px'
        }}
        lengthAngle={180}
        lineWidth={100}
        onClick={undefined}
        onMouseOut={undefined}
        onMouseOver={undefined}
        paddingAngle={0}
        radius={50}
        ratio={2}
        rounded={false}
        startAngle={180}
        style={{
          height: '100px'
        }}
      />
    </div>
  )
}

const chartWrapperStyle = css`
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  height: 120px;
  flex-direction: column;
  font-size: 18px;
  justify-content: center;
  padding: 0 40px 5px;
  width: 50%;
`

export default PieChart
