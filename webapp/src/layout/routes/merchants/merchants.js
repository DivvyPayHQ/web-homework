import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useMerchants } from '../../../gql'
import MerchantsTable from './merchants-table'
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
function renderContent (merchantsResult) {
  const { error = false, merchants = [], loading } = merchantsResult

  if (loading) {
    return <LoadingTable />
  }
  if (merchants) {
    return <MerchantsTable merchants={merchants} />
  }
  if (error) return <Error>Error</Error>
}

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Merchants () {
  const merchantsResult = useMerchants()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Wrapper>
      <Header>
        <div>Merchants</div>
        <Button onClick={() => navigate(`/merchants/create`, { state: { background: location } })}>Add New</Button>
      </Header>
      {renderContent(merchantsResult)}
    </Wrapper>
  )
}

export default Merchants
