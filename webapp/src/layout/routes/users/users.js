import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUsers } from '../../../gql'
import UsersTable from './users-table'
import { Button, LoadingTable } from '../../../components'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Error = styled.div`
  display: flex;
  justify-content: center;
`

const Header = styled.div`
  align-items: center;
  display: flex;
  font-size: 32px;
  font-weight: 700;
  justify-content: space-between;
  margin-bottom: 48px;
`

const Wrapper = styled.div`
  display: flex;
  padding: 60px 240px;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

/************************************
 * LOCAL FUNCTIONS
 ***********************************/
function renderContent (usersResult) {
  const { error = false, users = [], loading } = usersResult

  if (loading) {
    return <LoadingTable />
  }
  if (users) {
    return <UsersTable users={users} />
  }
  if (error) return <Error>Error</Error>
}

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Users () {
  const usersResult = useUsers()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Wrapper>
      <Header>
        <div>Users</div>
        <Button onClick={() => navigate(`/sign-up`, { state: { background: location } })}>Add New</Button>
      </Header>
      {renderContent(usersResult)}
    </Wrapper>
  )
}

export default Users
