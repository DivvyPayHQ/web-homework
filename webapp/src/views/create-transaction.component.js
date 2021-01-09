import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { css } from '@emotion/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { CREATE_TRANSACTION, GET_ALL_MERCHANTS, GET_ALL_USERS, GET_ALL_TRANSACTIONS } from '../graphql/transactions'
import { useMutation, useQuery } from '@apollo/react-hooks'

export function CreateTransaction () {
  const [createTransaction] = useMutation(CREATE_TRANSACTION, { update (cache, { data }) {
    const newTransaction = { ...data.createTransaction, amount: parseFloat(data.createTransaction.amount / 100) }
    const exisitingTransactions = cache.readQuery({
      query: GET_ALL_TRANSACTIONS
    })
    if (exisitingTransactions && newTransaction) {
      cache.writeQuery({
        query: GET_ALL_TRANSACTIONS,
        data: {
          transactions: [
            ...exisitingTransactions.transactions,
            newTransaction
          ]
        }
      })
    }
  } })
  const { data: merchantData } = useQuery(GET_ALL_MERCHANTS)
  const { data: userData } = useQuery(GET_ALL_USERS)
  const defaultTransactionState = { amount: 0, credit: false, debit: false, description: '', merchantId: '', userId: '' }
  const [transaction, setTransaction] = useState(defaultTransactionState)

  const handleChange = ({ target }) => {
    const value = target.name === 'amount' ? parseFloat(target.value) : target.value
    if (target.value === 'credit') {
      setTransaction({ ...transaction, credit: true, debit: false })
    } else if (target.value === 'debit') {
      setTransaction({ ...transaction, debit: true, credit: false })
    } else {
      setTransaction({ ...transaction, [target.name]: value })
    }
  }

  return (
    <>
      <div css={containerStyle}>
        <InputLabel id='amount'>Amount</InputLabel>
        <Input
          disableUnderline
          name='amount'
          onChange={handleChange}
          step='.01'
          type='number'
          value={transaction.amount}
        />

        <div>
          <FormControl css={inputLabelStyle}>
            <RadioGroup aria-label='debitOrCredit' name='debitOrCredit' onChange={handleChange} row>
              <FormControlLabel control={<Radio />} label='Credit' value='credit' />
              <FormControlLabel control={<Radio />} label='Debit' value='debit' />
            </RadioGroup>
          </FormControl>
        </div>

        <InputLabel css={inputLabelStyle} id='description'>Description</InputLabel>
        <textarea
          css={descriptionStyle}
          name='description'
          onChange={handleChange}
          value={transaction.description}
        />
        <InputLabel css={inputLabelStyle} id='merchant'>Merchant</InputLabel>
        <Select css={selectStyle} name='merchantId' onBlur={handleChange}>
          <option value=''>{``}</option>
          {merchantData && merchantData.merchants.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </Select>

        <InputLabel css={inputLabelStyle} id='users'>User</InputLabel>
        <Select css={selectStyle} name='userId' onBlur={handleChange}>
          <option value=''>{``}</option>
          {userData && userData.users.map(({ id, firstName, lastName }) => (
            <option key={id} value={id}>{firstName} {lastName}</option>
          ))}
        </Select>
        <div>
          <Button css={buttonStyle} onClick={() => {
            createTransaction({ variables: transaction })
            setTransaction(defaultTransactionState)
          }}>
          Create Transaction
          </Button>
        </div>
      </div>
    </>
  )
}

const buttonStyle = css`
  background-color: black;
  border-radius: 15px;
  color: white;
  margin-top: 12px;
  padding: 6px 16px;
  &:hover {
    background-color: #3b3b3b;
  }
`

const containerStyle = css`
  background-color: #efefef;
  border-radius: 25px;
  display: inline-block;
  padding: 40px;
  width: 200px;
`
const descriptionStyle = css`
  border-radius: 10px;
  border: 0px;
  margin-top: 8px;
`

const selectStyle = css`
  width: 180px;
`
const inputLabelStyle = css`
  padding-top: 12px;
`
