import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GetMerchants } from 'gql/merchants.gql'
import { GetTransactions } from 'gql/transactions.gql'
import { Grid, Typography } from '@material-ui/core'
import { Breadcrumbs, Loading, PieGraph, TeamCard } from 'components'

import aggregator from 'utils/aggregator'

export default function Merchants () {
  const { loading: loadingT, error: errorT, data: dataT = {} } = useQuery(GetTransactions)
  const { loading, error, data = {} } = useQuery(GetMerchants)
  const byMerchant = aggregator('merchant', dataT.transactions)

  if (loading || loadingT) return (<Loading />)

  if (error || errorT) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Grid container justify='center' spacing={6}>
        <Grid item xs={12}><Breadcrumbs /></Grid>
        <Grid item style={{ maxHeight: '500px' }} xs={12} >
          <Typography align='center' gutterBottom variant='h4'>
            Spend per Merchant
          </Typography>
          <PieGraph data={byMerchant} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={1} style={{ marginTop: '50px' }}>
            {data.merchants.map(
              m => <Grid item key={m.name} xs={2}><TeamCard id={m.id} name={m.name} /></Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}
