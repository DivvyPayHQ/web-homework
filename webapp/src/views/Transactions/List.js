import React, { Fragment } from 'react'
import { func, shape } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { AddTransaction, GetTransactions } from 'gql/transactions.gql'
import { Button, Grid, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { AreaGraph, Breadcrumbs, Loading, MUIModal, TransactionsTable } from 'components'
import aggregator from 'utils/aggregator'
import Add from './Add'

import styled from '@emotion/styled'
import { makeStyles } from '@material-ui/core/styles'
const FixedHeightGrid = styled(Grid)`
  max-height: 500px;
`
const useStyles = makeStyles((theme) => ({
  graphs: {
    margin: theme.spacing(8, 0),
    width: '100%'
  }
}))
function Transactions ({ history }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const [addTransaction] = useMutation(AddTransaction, {
    onCompleted: () => {
      handleClose()
      refetch()
    }
  })

  const { loading, error, data = {}, refetch } = useQuery(GetTransactions)
  const byDate = aggregator('date', data.transactions)

  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  const handleSubmit = (formData) => {
    addTransaction({
      variables: {
        user_id: formData.user_id,
        category_id: formData.category_id,
        merchant_id: formData.merchant_id,
        amount: Number(formData.amount),
        credit: formData.credit,
        description: formData.description || '',
        date: formData.date
      }
    })
  }

  if (loading) return (<Loading />)

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}><Breadcrumbs /></Grid>
        <Grid item xs={12}>
          <Button
            color='primary'
            onClick={handleOpen}
            startIcon={<AddIcon />}
            variant='contained'
          >
            Add Transaction
          </Button>
        </Grid>
        <Grid className={classes.graphs} container>
          <FixedHeightGrid item xs={12}>
            <Typography align='center' gutterBottom variant='h4'>
              Spend vs. Time
            </Typography>
            <AreaGraph data={byDate} />
          </FixedHeightGrid>
        </Grid>
        <Grid item xs={12}>
          <TransactionsTable data={data.transactions} refetch={refetch} />
        </Grid>
      </Grid>
      <MUIModal
        content={(
          <Add submitForm={handleSubmit} />
        )}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
    </Fragment>
  )
}

Transactions.propTypes = {
  history: shape({
    push: func.isRequired
  }).isRequired
}

export default withRouter(Transactions)
