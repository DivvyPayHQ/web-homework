import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useTransactions } from '../../../gql'
import TransactionsTable from './transactions-table'
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
function renderContent (transactionsResult) {
  const { error = false, transactions = [], loading } = transactionsResult

  if (loading) {
    return <LoadingTable />
  }
  if (transactions) {
    return <TransactionsTable transactions={transactions} />
  }
  if (error) return <Error>Error</Error>
}

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Transactions () {
  const transactionsResult = useTransactions()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Wrapper>
      <Header>
        <div>Transactions</div>
        <Button onClick={() => navigate(`/transactions/create`, { state: { background: location } })}>Add New</Button>
      </Header>
      {renderContent(transactionsResult)}
    </Wrapper>
  )
}

export default Transactions