import React from 'react'
import { CreateTransaction } from '../create-transaction.component'
import { GET_ALL_USERS } from '../../graphql/users'
import { useQuery } from '@apollo/react-hooks'
import Container from '@material-ui/core/Container'
import { TransactionTable } from '../transactions-table.component'

export function Users () {
  const { data, loading } = useQuery(GET_ALL_USERS)

  return (
    <>
      <Container>
        <CreateTransaction />
        {!loading && (<TransactionTable transactions={data.transactions} />)}
      </Container>
    </>
  )
}
