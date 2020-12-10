/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
// import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import
TransactionsTableRow
  from './TransactionsTableRow'
// import { TransactionHeader } from './transaction-components/transaction-header'
// import { PieChart } from './transaction-components/pie-chart'
// import { Select, Button, RadioBtn, Label } from './add-transactions'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

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

function Table (props) {
  const { loading: transactionsLoading, error: transactionsError, data: transactionData, refetch } = useQuery(GET_TRANSACTIONS)
  if (transactionsLoading) return <h1> </h1>

  return (
    <Fragment>

      <h1>Transactions</h1>
      <Fragment>
        {/* <TransactionHeader /> */}
        {
          transactionData.transactions.map(transaction => (
            <TransactionsTableRow key={transaction.id} transaction={transaction} />
          ))
        }
      </Fragment>

    </Fragment>
  )
}

export default Table

const OuterSelectContainer = styled('div')`
padding: 8px 10px 8px 10px;
background: #F2ECF3;
border: 1px solid #F2ECF3;
position: relative;
width: 80%;
margin: 10px 0px 10px 0px;
  `

const innerRowFlex = css`
width: 97%;
`
const flexColStyle = css`
display: flex;
justify-content: space-between;
flex-direction: column;
`
const flex = css`
display: flex;
`
const radioMargin = css`
margin-right: 10px;
`
const innerColFlex = css`
width: 50%;
`
const innerColPieFlex = css`
width: 50%;
margin-top: 1em;
`
const innerColFlexStyle = css`
display: flex;
justify-content: space-between;
flex-direction: row;
`
