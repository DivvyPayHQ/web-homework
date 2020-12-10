/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import Table from './Table'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { DataGrid } from '@material-ui/data-grid'

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

const columns = [
  { field: 'amount', headerName: 'Amount', width: 70 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'credit', headerName: 'Credit', width: 70 },
  { field: 'debit', headerName: 'Debit', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'merchant__typename', headerName: 'mt', width: 130 },
  { field: 'merchant_id', headerName: 'mid', width: 130 },
  { field: 'merchant_merchantName', headerName: 'mmname', width: 70 },
  { field: 'user__typename', headerName: 'ut', width: 130 },
  { field: 'user_firstName', headerName: 'first name', width: 130 },
  { field: 'user_id', headerName: 'uid', width: 70 },
  { field: 'user_lastName', headerName: 'uln', width: 130 }
]

function flattenObj (obj, parent, res = {}) {
  for (let key in obj) {
    let propName = parent ? parent + '_' + key : key
    if (typeof obj[key] === 'object') {
      flattenObj(obj[key], propName, res)
    } else {
      res[propName] = obj[key]
    }
  }
  return res
}

const TransactionsTable = () => {
  const { loading: transactionsLoading, error: transactionsError, data: transactionData, refetch } = useQuery(GET_TRANSACTIONS)

  if (transactionsLoading) return <h1> </h1>
  console.log(transactionData.transactions)
  const flattenedMap = transactionData.transactions.map(transaction => flattenObj(transaction))
  console.log(flattenedMap)

  return (
    <Fragment>
      <DataGrid checkboxSelection columns={columns} pageSize={5} rows={flattenedMap} />
    </Fragment>
  )
}

export default TransactionsTable
