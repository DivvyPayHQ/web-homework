import React, { useState } from 'react'
import { number, string } from 'prop-types'
import { useQuery } from '@apollo/client'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import GetTransactions from '../../gql/transactions.gql'

import { styles } from './ChartsStyles'
import { aggregateData } from './chartUtils'
import { formatCurrency, initialCaps, formatPercent } from '../../common/utils'

const COLORS = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600'
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, name } = props

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      dominantBaseline='central'
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      x={x}
      y={y}
    >
      {`${initialCaps(name)} ${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

const Chart = () => {
  const [debitSelected, setDebitSelected] = useState(true)
  const { data = { transactions: [] } } = useQuery(GetTransactions)

  const transactions = data.transactions

  const debits = transactions.filter(tx => tx.debit)
  const credits = transactions.filter(tx => tx.credit)

  const debitData = aggregateData(debits)
  const creditData = aggregateData(credits)

  console.log('creditData', creditData)

  const chartData = debitSelected ? debitData : creditData

  return (
    <div css={styles}>
      <h1>{debitSelected ? 'Spending Chart' : 'Deposit Chart'}</h1>
      <br />
      <div className='controls'>
        <button onClick={() => setDebitSelected(true)}>Charges</button>
        <button onClick={() => setDebitSelected(false)}>Deposits</button>
      </div>
      <div className='data'>
        <ResponsiveContainer
          height='100%'
          width='100%'
        >
          <PieChart height={800} width={800}>
            <Pie
              cx='50%'
              cy='50%'
              data={chartData.data}
              dataKey='value'
              fill='#8884d8'
              label={renderCustomizedLabel}
              labelLine={false}
              outerRadius={320}
            >
              {chartData.data.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className='legend-wrapper'>
          <h3>Legend</h3>
          <div className='legend-container'>
            <ul className='legend'>
              {chartData.data.map((dataPoint, i) => {
                return (
                  <>
                    <div className='color-box' style={{ backgroundColor: COLORS[i] }} />
                    <p className='name'>{initialCaps(dataPoint.name)}</p>
                    <p className='amount'>{formatCurrency(dataPoint.value)}</p>
                    <p className='percent'>{formatPercent(dataPoint.percent)}</p>
                  </>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart

renderCustomizedLabel.propTypes = {
  cx: number,
  cy: number,
  midAngle: number,
  name: string,
  innerRadius: number,
  outerRadius: number,
  percent: number
}
