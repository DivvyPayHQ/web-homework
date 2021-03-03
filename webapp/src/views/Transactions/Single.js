import React, { Fragment } from 'react'
import { shape, string } from 'prop-types'
import { useQuery, useMutation } from '@apollo/client'
import { GetTransaction, EditTransaction } from 'gql/transactions.gql'
import { Breadcrumbs, Loading } from 'components'
import { Grid } from '@material-ui/core'

import Edit from './Edit'

export default function Transaction ({ match }) {
  const { params } = match
  const { id } = params
  let { loading, error, data = {} } = useQuery(GetTransaction, {
    variables: { id }
  })

  const [editTransaction] = useMutation(EditTransaction, {
    onCompleted: () => {
      // go to transactions page
    }
  })

  const handleSubmit = (formData) => {
    editTransaction({
      variables: {
        id,
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
      <Grid container justify='center' spacing={6}>
        <Grid item xs={12}><Breadcrumbs name={id} /></Grid>
        <Grid item xs={4}>
          <Edit submitForm={handleSubmit} transaction={data.transaction} />
        </Grid>
      </Grid>
    </Fragment>
  )
}

Transaction.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired
}
