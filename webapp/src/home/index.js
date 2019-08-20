import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'

const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
      credit
      debit
      description
      merchant_id
      user_id
    }
  }
`

export const Home = () => {
  const { data } = useQuery(GET_TRANSACTIONS)

  const transactions = data.transactions || []

  return (
    <div css={transactionsStyle}>
      {transactions.map(({ amount, description, id, user_id: userId, merchant_id: merchantId }) => {
        return (
          <div css={transactionStyle} key={id}>
            <div>Id:</div>
            <Link to={`/transaction/${id}`}>{id}</Link>
            <div>Merchant Id:</div>
            <div>{merchantId}</div>
            <div>User Id:</div>
            <div>{userId}</div>
            <div>Amount:</div>
            <div>{amount}</div>
            <div>Description:</div>
            <div>{description}</div>
          </div>
        )
      })}
    </div>
  )
}

const transactionStyle = css`
  border: 1px solid black;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px;
`

const transactionsStyle = css`
  display: grid;
  grid-gap: 16px;
  margin: 12px;

  @media(min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`
