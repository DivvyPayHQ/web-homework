import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import { transactions } from '../../mocks/transactions-data'
import { TxTable } from '../components/transactions/TxTable'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)

  const editEntry = (id) => {
    window.location.replace(`/add/${id}`)
  }

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <TxTable data={transactions} editEntry={editEntry} />
    </Fragment>
  )
}
