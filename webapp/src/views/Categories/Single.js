import React, { Fragment } from 'react'
import { shape, string } from 'prop-types'
import { useQuery } from '@apollo/client'
import { GetCategory } from 'gql/categories.gql'
import { GetTransactionsByCategory } from 'gql/transactions.gql'
import { AreaGraph, Breadcrumbs, Loading, PieGraph, TransactionsTable } from 'components'
import { Grid, Typography } from '@material-ui/core'

import aggregator from 'utils/aggregator'

import styled from '@emotion/styled'
const FixedHeightGrid = styled(Grid)`
  max-height: 500px;
`
export default function Category ({ match }) {
  const { params } = match
  const { id } = params
  let { loading: loadingC, error: errorC, data: dataC = {} } = useQuery(GetCategory, {
    variables: { id }
  })
  const { loading, error, data = {}, refetch } = useQuery(GetTransactionsByCategory, {
    variables: { category_id: id }
  })

  const byDate = aggregator('date', data.transactions)
  const byMerchant = aggregator('merchant', data.transactions)

  let name = ''
  const { category } = dataC
  if (category) name = category.name

  if (loading || loadingC) return (<Loading />)

  if (error || errorC) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Grid container justify='center' spacing={6}>
        <Grid item xs={12}><Breadcrumbs name={name} /></Grid>
        <Grid item xs={12}><Typography align='center' variant='h2'>{name}</Typography></Grid>
        <FixedHeightGrid item lg={6} md={6} xs={12}>
          <PieGraph data={byMerchant} />
        </FixedHeightGrid>
        <FixedHeightGrid item lg={6} md={6} xs={12}>
          <AreaGraph data={byDate} />
        </FixedHeightGrid>
        <Grid item xs={12}>
          <TransactionsTable data={data.transactions} refetch={refetch} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

Category.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired
}
