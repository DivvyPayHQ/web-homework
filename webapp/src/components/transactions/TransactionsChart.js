import React from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'react-google-charts'
import { useQuery } from '@apollo/client'
import { ErrorPage } from '../errors'
import { Loading } from '../loading'
import GetCategories from '../../gql/queries/categories.gql'
import { translate } from '../../utils/translate'

export const TransactionsChart = ({ data }) => {
  const { loading, error, data: categories = {} } = useQuery(GetCategories)

  if (error) {
    return <ErrorPage error={error} />
  }

  if (loading) {
    return <Loading />
  }

  if (data?.transactions?.length > 0 && categories?.categories?.length > 0) {
    const chartData = [[translate('category'), translate('amount')]].concat(
      categories.categories.map(category => {
        return [
          category.name,
          data.transactions.reduce((total, transaction) => {
            if (transaction.category.id === category.id) {
              total += transaction.amount
            }
            return total
          }, 0)
        ]
      })
    )
    return (
      <Chart
        chartType='PieChart'
        data={chartData}
        height={'300px'}
        loader={<Loading />}
        options={{
          title: translate('amount_spent_per_category')
        }}
        rootProps={{ 'data-testid': '2' }}
        width={'500px'}
      />
    )
  }

  return null
}

TransactionsChart.propTypes = {
  data: PropTypes.object.isRequired
}
