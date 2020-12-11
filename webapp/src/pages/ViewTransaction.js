/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { PieChart } from '../components/Charts/PieChart'
import { BarChart } from '../components/Charts/BarChart'
import { CardPieChart } from '../components/Charts/CardPieChart'
import { CardBarChart } from '../components/Charts/CardBarChart'
import TransactionsTableRow from '../components/Tables/TransactionsTableRow'
import Radio from '@material-ui/core/Radio'
import BarChartIcon from '@material-ui/icons/BarChart'
import PieChartIcon from '@material-ui/icons/PieChart'
import TableHeader from '../components/Tables/TableHeader'

export const GET_TRANSACTIONS = gql`
  query GetTransactions($user_id: String, $merchant_id: String) {
    transactions(user_id: $user_id, merchant_id: $merchant_id) {
        id
        user_id
        merchant_id
        amount
        description
        credit
        debit
        category
        user {
            firstName
            lastName
        }
        merchant {
          merchantName
        }
    }
    users {
      id
      firstName
      lastName
  }
  merchants {
    id
    merchantName
}
  }
`

const TransactionView = (props) => {
  const { loading: transactionsLoading, error: transactionsError, data: transactionData, refetch } = useQuery(GET_TRANSACTIONS)

  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [numbersOrRoman, setNumbersOrRoman] = useState('Numbers')
  const [selectedUser, setSelectedUser] = useState('')
  const [chart, setChart] = useState(true)

  const CategoryChartChooser = () => {
    if (chart === true) {
      return <PieChart transactions={transactionData.transactions} />
    } else {
      return <BarChart transactions={transactionData.transactions} />
    }
  }
  const CardChartChooser = () => {
    if (chart === true) {
      return <CardPieChart transactions={transactionData.transactions} />
    } else {
      return <CardBarChart transactions={transactionData.transactions} />
    }
  }

  const handleFilter = () => {
    var variable = {
      'user_id': selectedUser,
      'merchant_id': selectedMerchant
    }
    if (selectedUser.length < 1) {
      delete variable.user_id
    }
    if (selectedMerchant.length < 1) {
      delete variable.merchant_id
    }
    if (Object.entries(variable).length > 0) {
      refetch(variable)
    } else {
      refetch()
    }
  }
  if (transactionsLoading) return <h1> </h1>
  if (transactionsError) return <h1> </h1>
  return (
    <Wrapper>
      <GraphWrapper>
        <Graphs>
          <CategoryChartChooser />
          <CardChartChooser />
          <GraphIcons>
            <h2 onClick={() => setChart(false)}><BarChartIcon /></h2>
            <h2 onClick={() => setChart(true)}><PieChartIcon /></h2>
          </GraphIcons>
        </Graphs>
      </GraphWrapper>
      <TableWrapper>
        <Header>
          <h1>Transactions</h1>
          <div>
            <Radio checked={numbersOrRoman === 'Numbers'}
              color='default' id='radio-one' name='switch-one' onChange={(e) => setNumbersOrRoman(e.target.value)} type='radio' value='Numbers' />
            <label htmlFor='radio-one' >Numbers</label>
            <Radio checked={numbersOrRoman === 'Roman'}
              color='default' id='radio-two' name='switch-two' onChange={(e) => setNumbersOrRoman(e.target.value)} type='radio' value='Roman' />
            <label htmlFor='radio-two' >Roman</label>
          </div>
        </Header>
        <TableHeader />
        {
          transactionData.transactions.map(transaction => (
            <TransactionsTableRow key={transaction.id} romanCheck={numbersOrRoman === 'Numbers'} transaction={transaction} />
          ))
        }
      </TableWrapper>
    </Wrapper>
  )
}
export default TransactionView

const GraphWrapper = styled('div')`
width: 30%;
font-size: 1.5rem;


`
const TableWrapper = styled('div')`
width: 60%;
min-height: 700px;

}
`
const Wrapper = styled('div')`
display: flex;
justify-content: space-evenly;
align-items: center;
`
const GraphIcons = styled('div')`
display:flex;
justify-content: center;
h2{
  margin: 10px;
}
`
const Graphs = styled('div')`
display:flex;
justify-content: space-evenly;
flex-direction: column;
border-radius: 10px;
min-height: 700px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`
const Header = styled('div')`
display:flex;
align-items:center;
justify-content: space-between;
`
