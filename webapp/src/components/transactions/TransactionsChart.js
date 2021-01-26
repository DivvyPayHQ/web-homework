import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Chart } from 'react-google-charts'
import { useQuery } from '@apollo/client'
import { ErrorPage } from '../errors'
import { Loading } from '../loading'
import GetCategories from '../../gql/queries/categories.gql'
import { translate } from '../../utils/translate'

const StyledChart = styled(Chart)`
  min-width: 500px;
  min-height: 300px;

  @media screen and (max-width: 550px) {
    width: 100%;
    min-width: 100%;
  }
`

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
      <StyledChart
        chartType='PieChart'
        data={chartData}
        loader={<Loading />}
        options={{
          title: translate('amount_spent_per_category')
        }}
        rootProps={{ 'data-testid': '2' }}
      />
    )
  }

  return null
}

TransactionsChart.propTypes = {
  data: PropTypes.object.isRequired
}
