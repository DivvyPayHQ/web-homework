import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

const GET_TRANSACTION = gql`
  query Transaction($id: String!) {
    transaction(id: $id) {
      id
      amount
      credit
      debit
      description
      merchant_id
      user_id
    }
  }
`

export const Transaction = ({ match: { params: { id } } }) => {
  const { data } = useQuery(GET_TRANSACTION, {
    variables: {
      id
    }
  })

  const transaction = data.transaction || {}

  const { amount, credit, debit, description, merchant_id: merchantId, user_id: userId } = transaction

  return (
    <div>
      <div>Merchant Id:</div>
      <div>{merchantId}</div>
      <div>User Id:</div>
      <div>{userId}</div>
      <div>Amount:</div>
      <div>{amount}</div>
      <div>Credit:</div>
      <div>{`${credit}`}</div>
      <div>Debit:</div>
      <div>{`${debit}`}</div>
      <div>Description:</div>
      <div>{description}</div>
    </div>
  )
}

Transaction.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default withRouter(Transaction)
