import React, { useState } from 'react'
import { number, string } from 'prop-types'
import { useQuery } from '@apollo/client'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import GetTransactions from '../../gql/transactions.gql'

import { styles } from './ChartsStyles'
import { aggregateData } from './chartUtils'
import { formatCurrency, initialCaps } from '../../common/utils'

// const testData = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 }
// ]

const COLORS = ['#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600']

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
      // textAnchor={x > cx ? 'start' : 'end'}
      textAnchor={'center'}
      x={x}
      y={y}
    >
      {`${initialCaps(name)} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const Chart = () => {
  const [debitSelected, setDebitSelected] = useState(true)
  const { data = { transactions: [] } } = useQuery(GetTransactions)

  const transactions = data.transactions

  console.log('transactions', transactions)

  const debits = transactions.filter(tx => tx.debit)
  const credits = transactions.filter(tx => tx.credit)

  console.log('credits', credits)

  const debitData = aggregateData(debits)
  const creditData = aggregateData(credits)

  const chartData = debitSelected ? debitData : creditData

  return (
    <div css={styles}>
      <h1>{debitSelected ? 'Spending Chart' : 'Deposit Chart'}</h1>
      <br />
      <div className='controls'>
        <button onClick={() => setDebitSelected(true)}>Debits</button>
        <button onClick={() => setDebitSelected(false)}>Credits</button>
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
              data={chartData}
              dataKey='value'
              fill='#8884d8'
              label={renderCustomizedLabel}
              labelLine={false}
              outerRadius={320}
            >
              {chartData.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ul className='legend'>
          {chartData.map((dataPoint, i) => {
            return (
              <li key={dataPoint.name}>
                <div className='left'>
                  <div className='color-box' style={{ backgroundColor: COLORS[i] }} />
                  <p>{initialCaps(dataPoint.name)}</p>
                </div>
                <span>{formatCurrency(dataPoint.value)}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Chart

// Chart.propTypes

renderCustomizedLabel.propTypes = {
  cx: number,
  cy: number,
  midAngle: number,
  name: string,
  innerRadius: number,
  outerRadius: number,
  percent: number
}
