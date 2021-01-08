import React, { useEffect } from 'react'
import { CreateTransaction } from '../views/create-transaction.component'
import { GET_ALL_TRANSACTIONS } from '../graphql/transactions'
import { useQuery } from '@apollo/react-hooks'

export function Home () {
  const { data } = useQuery(GET_ALL_TRANSACTIONS)

  useEffect(() => {
    console.log(data)
    console.log('hello')
  }, [data])

  return (
    <>
      <CreateTransaction />

    </>
  )
}
