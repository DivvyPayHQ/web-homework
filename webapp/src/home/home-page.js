import React, { useEffect } from 'react'
import { CreateTransaction } from '../views/create-transaction.component'
import { GET_ALL_TRANSACTIONS } from '../graphql/transactions'
import { useQuery } from '@apollo/react-hooks'
import Container from '@material-ui/core/Container'
import { TransactionTable } from '../views/transactions-table.component'

export function Home () {
  const { data, loading } = useQuery(GET_ALL_TRANSACTIONS)

  useEffect(() => {
    console.log(data)
    console.log('hello')
  }, [data])

  return (
    <>
      <Container>
        <CreateTransaction />
        {!loading && (<TransactionTable transactions={data.transactions} />)}
      </Container>
    </>
  )
}
