import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { css } from '@emotion/core'
import { useMutation, useQuery } from '@apollo/client'
import { createTransaction } from '../../gql/transactions.gql'
import { getMerchants } from '../../gql/merchants.gql'

export function CreateTransaction () {
  const [amount, setAmount] = useState(0)
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [createTransactionMutation] = useMutation(createTransaction)
  const { data: merchantList } = useQuery(getMerchants)

  return (
    <>
      <div css={containerStyle}>
        <div css={inputStyle}>
          <TextField
            onChange={(event) => {
              console.log('new amount', event.target.value)
              setAmount(event.target.value)
            }}
            type='number'
            value={amount}
          />
          <Select
            id='demo-simple-select'
            onChange={(newSelected) => {
              setSelectedMerchant(newSelected)
            }}
            value={selectedMerchant}
          >
            {merchantList && merchantList.merchants.map(({ id, name }) => (
              <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </div>
        <div>
          <Button
            css={buttonStyle}
            onClick={() => {
              console.log('adding')
              const transaction = {
                amount: +amount,
                credit: true,
                debit: true,
                description: 'Added through button click',
                merchantId: 'd9b5943c-8cb5-43a8-a6d0-03ddd9c7233e',
                userId: 'ed301d6d-c3f3-4c6f-9fc4-fd3df35a6a01'
              }
              console.log(transaction)
              createTransactionMutation({ variables: transaction })
            }}
            variant='outlined'
          >
            ADD TRANSACTION
          </Button>
        </div>
      </div>
    </>
  )
}

const containerStyle = css`
  border-radius: 15px;
  max-width: 250px;
`

const buttonStyle = css`
  background-color: white;
  color: black;
`

const inputStyle = css`
  margin: auto;
  padding: 8px;
`
