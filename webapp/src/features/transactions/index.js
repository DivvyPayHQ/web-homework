import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../../gql/transactions.gql'
import TxTable from '../../components/transactions/TxTable'

const Transactions = () => {
  const { loading, error, data = {} } = useQuery(GetTransactions)
  if (data) {
    console.log(data)
  }

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    console.log(error)
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <TxTable data={data.transactions} />
    </Fragment>
  )
}
export default Transactions
