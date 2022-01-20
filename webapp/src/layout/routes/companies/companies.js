import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCompanies } from '../../../gql'
import CompaniesTable from './companies-table'
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
function renderContent (companiesResult) {
  const { error = false, companies = [], loading } = companiesResult

  if (loading) {
    return <LoadingTable />
  }
  if (companies) {
    return <CompaniesTable companies={companies} />
  }
  if (error) return <Error>Error</Error>
}

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Companies () {
  const companiesResult = useCompanies()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Wrapper>
      <Header>
        <div>Companies</div>
        <Button onClick={() => navigate(`/companies/create`, { state: { background: location } })}>Add New</Button>
      </Header>
      {renderContent(companiesResult)}
    </Wrapper>
  )
}

export default Companies
