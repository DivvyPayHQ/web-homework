/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../../pages/ViewTransaction'
import gql from 'graphql-tag'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const REMOVE_TRANSACTION = gql`
  mutation RemoveTransaction($id: String!) {
    removeTransaction(id: $id) {
      id
    }
  }
`

function TransactionsTableRow ({
  transaction: { id, description, credit, debit, merchant_id, user_id, amount, user, category, merchant }
}) {
  // eslint-disable-next-line no-unused-vars
  const [removeTransaction, { transactionData }] = useMutation(REMOVE_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }]
  })
  return (
    <div css={grid}>
      <GridCol1 debit={debit}>{debit ? 'Debit' : 'Credit'}</GridCol1>
      <div css={gridCol2}>{user.firstName} {user.lastName}</div>
      <div css={gridCol3}>{merchant.merchantName}</div>
      <div css={gridCol4}>{category}</div>
      <div css={gridCol5}>{description}</div>
      {/* <div css={gridCol6}>{romanCheck ? '$' + amount.toFixed(2) : convertNum(amount)}</div> */}
      <Link css={gridCol7} to={`/UpdateTransaction/${id}`}><Icon className='material-icons'>edit</Icon></Link>
      <div css={gridCol8}>
        <Icon className='material-icons' onClick={() => {
          removeTransaction({
            variables: { 'id': id }
          })
        }}>delete</Icon>
      </div>
    </div>
  )
}

export default TransactionsTableRow

const grid = css`
display: grid;
grid-template-columns: 9% 22% 13% 13% 28% 9% 3% 3%;
border-bottom: 1px solid #F2ECF3;
height: 40px;
align-items: center;
font-size: 14px;
`
const GridCol1 = styled('div')`
grid-column: 1;
background-color: ${props => props.debit ? `#6AACA3` : `#C7E872`};
text-align: center;
width: 60%;
color: ${props => props.debit ? `white` : `black`};
`
const gridCol2 = css`
grid-column: 2;
text-overflow: ellipsis;
overflow: hidden; 
white-space: nowrap;
`
const gridCol3 = css`
grid-column: 3;
text-overflow: ellipsis;
overflow: hidden; 
white-space: nowrap;
`
const gridCol4 = css`
grid-column: 4;
`
const gridCol5 = css`
grid-column: 5;
text-overflow: ellipsis;
overflow: hidden; 
white-space: nowrap;
`
// eslint-disable-next-line no-unused-vars
const gridCol6 = css`
grid-column: 6;
text-overflow: ellipsis;
overflow: hidden; 
white-space: nowrap;
`
const gridCol7 = css`
grid-column: 7;
justify-self: end;
`
const gridCol8 = css`
grid-column: 8;
justify-self: end;
`

const Icon = styled('i')`
outline: 0;
font-size: 5px;
color: black;
cursor: pointer;
`
