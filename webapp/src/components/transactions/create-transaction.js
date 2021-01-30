import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import { css } from '@emotion/core'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { createTransaction, getTransactions } from '../../gql/transactions.gql'
import { getMerchants } from '../../gql/merchants.gql'
import { getUsersQuery } from '../../gql/users.gql'

export function CreateTransaction () {
  const [amount, setAmount] = useState(0)
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [description, setDescription] = useState('')
  const [creditDebitSelect, setCreditDebitSelect] = useState('credit')

  const [createTransactionMutation] = useMutation(createTransaction, { update (cache, { data }) {
    const createdTransaction = data.createTransaction
    const { transactions } = cache.readQuery({
      query: getTransactions
    })
    cache.writeQuery({
      query: getTransactions,
      data: {
        transactions: [
          ...transactions,
          createdTransaction
        ]
      }
    })
  } })
  const { data: merchantList } = useQuery(getMerchants)
  const { data: usersList } = useQuery(getUsersQuery)

  const isButtonDisabled = description !== '' && selectedMerchant !== '' && selectedUser !== ''

  return (
    <>
      <div css={containerStyle}>
        <div css={titleStyle} >
          NEW TRANSACTION
        </div>
        <div>
          <InputLabel css={inputLabelStyle}>Amount</InputLabel>
          <TextField
            css={widthStyle}
            onChange={(event) => {
              setAmount(event.target.value)
            }}
            type='number'
            value={amount}
            variant='filled'
          />
          <InputLabel css={inputLabelStyle}>Merchant</InputLabel>
          <Select
            css={widthStyle}
            id='merchant-select'
            label='Merchant'
            onChange={(event) => {
              setSelectedMerchant(event.target.value)
            }}
            value={selectedMerchant}
            variant='filled'
          >
            {merchantList && merchantList.merchants.map(({ id, name }) => (
              <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
          </Select>
          <InputLabel css={inputLabelStyle}>User</InputLabel>
          <Select
            css={widthStyle}
            id='user-select'
            label='User'
            onChange={(event) => {
              setSelectedUser(event.target.value)
            }}
            value={selectedUser}
            variant='filled'
          >
            {usersList && usersList.users.map(({ id, firstName, lastName }) => (
              <MenuItem key={id} value={id}>{firstName} {lastName}</MenuItem>
            ))}
          </Select>
          <InputLabel css={inputLabelStyle}>Description</InputLabel>
          <TextField
            css={widthStyle}
            id='description-field'
            multiline
            onChange={(event) => {
              setDescription(event.target.value)
            }}
            rows={3}
            value={description}
            variant='filled'
          />
          <FormControl css={creditDebitRadioStyle}>
            <RadioGroup
              css={creditDebitRadioStyle}
              onChange={(event) => {
                setCreditDebitSelect(event.target.value)
              }}
              value={creditDebitSelect}
            >
              <FormControlLabel control={<Radio color='default' />} label='Credit' value='credit' />
              <FormControlLabel control={<Radio color='default' />} label='Debit' value='debit' />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button
            css={buttonStyle}
            disabled={!isButtonDisabled}
            onClick={() => {
              const transaction = {
                amount: +amount,
                credit: creditDebitSelect === 'credit',
                debit: creditDebitSelect === 'debit',
                description,
                merchantId: selectedMerchant,
                userId: selectedUser
              }
              createTransactionMutation({ variables: transaction })
              setAmount(0)
              setCreditDebitSelect('credit')
              setDescription('')
              setSelectedMerchant('')
              setSelectedUser('')
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
  background-color: lightgrey;
  border-radius: 15px;
  max-width: 300px;
  min-width: 300px;
  padding: 15px;
`

const creditDebitRadioStyle = css`
  color: white;
  display: inline-block;
  margin-bottom: 25px;
  margin-top: 10px;
  padding: 5px;
  width: 100%;
`

const buttonStyle = css`
  background-color: white;
  color: black;
`

const inputLabelStyle = css`
  margin-left: 5px;
  padding-top: 13px;
`
const titleStyle = css`
  color: grey;
  padding: 15px 10px 15px 10px;
`

const widthStyle = css`
  margin-left: 5px;
  padding-right:5px;
  width: 100%;
`
