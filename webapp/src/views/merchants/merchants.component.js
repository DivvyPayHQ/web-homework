import React from 'react'
import { CreateTransaction } from '../create-transaction.component'
import { useQuery } from '@apollo/react-hooks'
import Container from '@material-ui/core/Container'
import { TransactionTable } from '../transactions-table.component'
import { GET_ALL_MERCHANTS } from '../../graphql/merchants'

export function Users () {
  const { data, loading } = useQuery(GET_ALL_MERCHANTS)

  return (
    <>
      <Container>
        <CreateTransaction />
        {!loading && (<TransactionTable transactions={data.transactions} />)}
      </Container>
    </>
  )
}
