import React from 'react'
import { CreateUser } from './create-user.component'
import { GET_ALL_USERS } from '../../graphql/users'
import { useQuery } from '@apollo/react-hooks'
import Container from '@material-ui/core/Container'
import { UsersTable } from './users-table.component'

export function Users () {
  const { data, loading } = useQuery(GET_ALL_USERS)

  return (
    <>
      <Container>
        <CreateUser />
        {!loading && (<UsersTable users={data.users} />)}
      </Container>
    </>
  )
}
