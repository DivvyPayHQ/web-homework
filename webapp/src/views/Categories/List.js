import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GetCategories } from 'gql/categories.gql'
import { GetTransactions } from 'gql/transactions.gql'
import { Breadcrumbs, CategoryCard, Loading, PieGraph } from 'components'
import { Grid, Typography } from '@material-ui/core'
import aggregator from 'utils/aggregator'

export default function Categories () {
  const { loading: loadingT, error: errorT, data: dataT = {} } = useQuery(GetTransactions)
  const { loading, error, data = {} } = useQuery(GetCategories)
  const byCategory = aggregator('category', dataT.transactions)

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
      <Grid container justify='center' spacing={2}>
        <Grid item xs={12}><Breadcrumbs /></Grid>
        <Grid item style={{ maxHeight: '500px' }} xs={12} >
          <Typography align='center' gutterBottom variant='h4'>
            Spend per Category
          </Typography>
          <PieGraph data={byCategory} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={1} style={{ marginTop: '50px' }}>
            {data.categories.map(
              m => <Grid item key={m.name} xs={2}><CategoryCard id={m.id} name={m.name} /></Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}
