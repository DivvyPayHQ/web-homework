import React, { Fragment } from 'react'
import { shape, string } from 'prop-types'
import { useQuery } from '@apollo/client'
import { GetUser } from 'gql/users.gql'
import { GetTransactionsByUser } from 'gql/transactions.gql'
import { AreaGraph, Breadcrumbs, Loading, PieGraph, TransactionsTable } from 'components'
import { Grid, Typography } from '@material-ui/core'

import aggregator from 'utils/aggregator'

import styled from '@emotion/styled'
const FixedHeightGrid = styled(Grid)`
  max-height: 500px;
`

export default function User ({ match }) {
  const { params } = match
  const { id } = params
  let { loading: loadingU, error: errorU, data: dataU = {} } = useQuery(GetUser, {
    variables: { id }
  })
  const { loading, error, data = {}, refetch } = useQuery(GetTransactionsByUser, {
    variables: { user_id: id }
  })

  const byDate = aggregator('date', data.transactions)
  const byCategory = aggregator('category', data.transactions)
  const byMerchant = aggregator('merchant', data.transactions)

  let name = ''
  const { user } = dataU
  if (user) name = `${user.first_name} ${user.last_name}`

  if (loading || loadingU) return (<Loading />)

  if (error || errorU) {
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
        <FixedHeightGrid item lg={12} md={12} xs={12}>
          <AreaGraph data={byDate} />
        </FixedHeightGrid>
        <FixedHeightGrid item lg={6} md={6} xs={12}>
          <PieGraph data={byCategory} />
        </FixedHeightGrid>
        <FixedHeightGrid item lg={6} md={6} xs={12}>
          <PieGraph data={byMerchant} />
        </FixedHeightGrid>
        <Grid item xs={12}>
          <TransactionsTable data={data.transactions} refetch={refetch} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

User.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired
}
