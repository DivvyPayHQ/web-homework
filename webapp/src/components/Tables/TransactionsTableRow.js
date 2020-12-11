/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../../pages/ViewTransaction'
import gql from 'graphql-tag'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const REMOVE_TRANSACTION = gql`
  mutation RemoveTransaction($id: String!) {
    removeTransaction(id: $id) {
      id
    }
  }
`

function TransactionsTableRow ({ romanCheck,
  transaction: { id, description, credit, debit, merchant_id, user_id, amount, user, category, merchant }
}) {
  // eslint-disable-next-line no-unused-vars
  const [removeTransaction, { transactionData }] = useMutation(REMOVE_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }]
  })
  const convertNum = (num) => {
    var roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    }
    var result = ''

    for (var key in roman) {
      if (num >= roman[key]) {
        result += key.repeat(Math.trunc(num / roman[key]))
        num -= roman[key] * Math.trunc(num / roman[key])
      }
    }
    return result
  }
  return (
    <div css={grid}>
      <div css={gridCol1}>{romanCheck ? '$' + amount.toFixed(2) : convertNum(amount)}</div>
      <div css={gridCol2}>{user.firstName} {user.lastName}</div>
      <div css={gridCol3}>{merchant.merchantName}</div>
      <div css={gridCol4}>{category}</div>
      <div css={gridCol5}>{description}</div>
      <div debit={debit}>{debit ? 'Debit' : 'Credit'}</div>
      <Link css={gridCol7} to={`/UpdateTransaction/${id}`}><EditIcon style={{ color: 'gray' }} /></Link>
      <div css={gridCol8}>
        <DeleteIcon className='material-icons' onClick={() => {
          removeTransaction({
            variables: { 'id': id }
          })
        }} />
      </div>
    </div>
  )
}

export default TransactionsTableRow

const grid = css`
display: grid;
grid-template-columns: 9% 22% 13% 13% 28% 5% 7% 3%;
border-bottom: 1px solid #F2ECF3;
height: 40px;
align-items: center;
font-size: 14px;
`
const gridCol1 = css`
grid-column: 1;
text-overflow: ellipsis;
overflow: hidden; 
white-space: nowrap;
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
