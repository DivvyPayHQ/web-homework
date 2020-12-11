/* eslint-disable no-new */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Chart from 'chart.js'

export class CardPieChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      updateTransactions: this.props.transaction
    }
  }

    chartRef = React.createRef();

    componentDidMount (props) {
      const debit = this.props.transactions.filter(transaction => transaction.debit === true).length > 0 ? this.props.transactions.filter(transaction => transaction.debit === true).map(transaction => transaction.amount).reduce((a, b) => (a + b)) : 0
      const credit = this.props.transactions.filter(transaction => transaction.credit === true).length > 0 ? this.props.transactions.filter(transaction => transaction.credit === true).map(transaction => transaction.amount).reduce((a, b) => (a + b)) : 0

      const myChartRef = this.chartRef.current.getContext('2d')

      new Chart(myChartRef, {
        type: 'pie',
        data: {
          datasets: [
            {
              backgroundColor: ['#E5FCC2', '#9DE0AD'],
              label: 'Transactions',
              data: [credit, debit]
            }
          ],
          labels: ['Credit', 'Debit']
        },
        options: {
        }
      })
    }

    render () {
      return (
        <div>
          <canvas
            id='myChart'
            ref={this.chartRef}
          />
        </div>
      )
    }
}
