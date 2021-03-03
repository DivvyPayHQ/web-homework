import React, { Fragment } from 'react'
import { shape, string } from 'prop-types'
import { useQuery } from '@apollo/client'
import { GetMerchant } from 'gql/merchants.gql'
import { GetTransactionsByMerchant } from 'gql/transactions.gql'
import { AreaGraph, Breadcrumbs, Loading, PieGraph, TransactionsTable } from 'components'
import { Grid, Typography } from '@material-ui/core'

import aggregator from 'utils/aggregator'

import styled from '@emotion/styled'
const FixedHeightGrid = styled(Grid)`
  max-height: 500px;
`
export default function Merchant ({ match }) {
  const { params } = match
  const { id } = params
  let { loading: loadingM, error: errorM, data: dataM = {} } = useQuery(GetMerchant, {
    variables: { id }
  })
  const { loading, error, data = {}, refetch } = useQuery(GetTransactionsByMerchant, {
    variables: { merchant_id: id }
  })

  const byDate = aggregator('date', data.transactions)
  const byCategory = aggregator('category', data.transactions)

  let name = ''
  const { merchant } = dataM
  if (merchant) name = merchant.name

  if (loading || loadingM) return (<Loading />)

  if (error || errorM) {
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
        <FixedHeightGrid item lg={4} md={5} xs={12}>
          <PieGraph data={byCategory} />
        </FixedHeightGrid>
        <FixedHeightGrid item lg={8} md={7} xs={12}>
          <AreaGraph data={byDate} />
        </FixedHeightGrid>
        <Grid item xs={12}>
          <TransactionsTable data={data.transactions} refetch={refetch} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

Merchant.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired
}
