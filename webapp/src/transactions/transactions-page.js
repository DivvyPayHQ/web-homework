import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { Outlet } from 'react-router-dom'

import GetTransactions from 'src/gql/transactions.gql'
import { TxTable } from 'src/components/transactions/TxTable'

export function Transactions () {
  const { loading, error, data = {} } = useQuery(GetTransactions)

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
      <TxTable data={data.transactions} />
      <Outlet />
    </Fragment>
  )
}
