import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { getTransactions } from '../gql/transactions.gql.js'
import { TxTable } from '../components/transactions/TxTable'
import { TransactionModal } from '../components/transactions/transaction-modal'

export function Home () {
  const { loading, error, data = {} } = useQuery(getTransactions)

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
      <TransactionModal />
    </Fragment>
  )
}
