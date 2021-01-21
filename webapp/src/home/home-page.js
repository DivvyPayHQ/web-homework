import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/queries/transactions.gql'
import GetUsers from '../gql/queries/users.gql'
import GetMerchants from '../gql/queries/merchants.gql'
import { TxTable } from '../components/transactions/TxTable'

export const Home = () => {
  const { loading, error, data = {} } = useQuery(GetTransactions)
  console.log('data: ', data)
  const { data: users = {} } = useQuery(GetUsers)
  console.log('users: ', users)
  const { data: merchants = {} } = useQuery(GetMerchants)
  console.log('merchants: ', merchants)

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
    </Fragment>
  )
}
