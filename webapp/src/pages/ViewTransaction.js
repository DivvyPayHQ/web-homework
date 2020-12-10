/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const GET_TRANSACTIONS = gql`
  query GetTransactions($user_id: String, $merchant_id: String) {
    transactions(user_id: $user_id, merchant_id: $merchant_id) {
        id
        user_id
        merchant_id
        amount
        description
        credit
        debit
        category
        user {
            firstName
            lastName
        }
        merchant {
          merchantName
        }
    }
    users {
      id
      firstName
      lastName
  }
  merchants {
    id
    merchantName
}
  }
`

const TransactionView = (props) => {
  const { loading: transactionsLoading, error: transactionsError, data: transactionData, refetch } = useQuery(GET_TRANSACTIONS)
  const [selectedMerchant, setSelectedMerchant] = useState('')

  function handleFilter () {
    var variable = {
      'merchant_id': selectedMerchant
    }
    if (selectedMerchant.length < 1) {
      delete variable.merchant_id
    }
    if (Object.entries(variable).length > 0) {
      refetch(variable)
    } else {
      refetch()
    }
  }
  return (

    <Fragment>
      {/* <TransactionHeader />
      {
        transactionData.transactions.map(transaction => (
          <TransactionLine key={transaction.id} romanCheck={numbersOrRoman === 'Numbers'} transaction={transaction} />
        ))
      } */}
    </Fragment>

  )
}
export default TransactionView
