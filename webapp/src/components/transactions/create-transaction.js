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
import { useMutation, useQuery } from '@apollo/client'
import { createTransaction } from '../../gql/transactions.gql'
import { getMerchants } from '../../gql/merchants.gql'
import { getUsersQuery } from '../../gql/users.gql'

export function CreateTransaction () {
  const [amount, setAmount] = useState(0)
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [description, setDescription] = useState('')
  const [creditDebitSelect, setCreditDebitSelect] = useState('credit')

  const [createTransactionMutation] = useMutation(createTransaction)
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
          <FormControl css={amountStyle}>
            <TextField
              label='Enter Amount'
              onChange={(event) => {
                setAmount(event.target.value)
              }}
              type='number'
              value={amount}
              variant='outlined'
            />
          </FormControl>
          <div css={selectStyle}>
            <FormControl css={amountStyle}>
              <InputLabel css={inputLabelStyle}>Merchant</InputLabel>
              <Select
                id='merchant-select'
                label='Merchant'
                onChange={(event) => {
                  console.log('selecting', event)
                  setSelectedMerchant(event.target.value)
                }}
                value={selectedMerchant}
                variant='outlined'
              >
                {merchantList && merchantList.merchants.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl css={amountStyle}>
              <InputLabel css={inputLabelStyle}>User</InputLabel>
              <Select
                id='user-select'
                label='User'
                onChange={(event) => {
                  setSelectedUser(event.target.value)
                }}
                value={selectedUser}
                variant='outlined'
              >
                {usersList && usersList.users.map(({ id, firstName, lastName }) => (
                  <MenuItem key={id} value={id}>{firstName} {lastName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <FormControl css={amountStyle}>
            <TextField
              id='description-field'
              label='Add a description'
              multiline
              onChange={(event) => {
                setDescription(event.target.value)
              }}
              rows={3}
              value={description}
              variant='outlined'
            />
          </FormControl>
          <FormControl css={creditDebitRadioStyle}>
            <RadioGroup
              css={creditDebitRadioStyle}
              onChange={(event) => {
                console.log('adlkfs', event.target.value)
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
              console.log(transaction)
              createTransactionMutation({ variables: transaction })
              // props.onClose()
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

const amountStyle = css`
  padding: 5px 3px 5px 3px;
  width: 100%;
`
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
  padding-left: 25px;
`
const titleStyle = css`
  padding: 15px 10px 15px 10px;
`

const selectStyle = css`
  display: flex;
  flex-direction: row;
`
