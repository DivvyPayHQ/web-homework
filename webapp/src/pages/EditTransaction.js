/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Button from '@material-ui/core/Button'
import { useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { GET_TRANSACTIONS } from './ViewTransaction'
import { Categories, useStyles, getStyles } from './AddTransaction'
import { Wrapper, PageWrapper, Title } from './AddUser'

const GET_TRANSACTION = gql`
  query GetTransaction($id: String!) {
    transaction(id: $id) {
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

const GET_USERS = gql`
  query GetUsers {
    users {
        id
        firstName
        lastName
    }
  }
`
const GET_MERCHANT = gql`
  query GetMerchant {
    merchants {
        id
        merchantName
    }
  }
`

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransactions($id: String, $user_id: String, $description: String, $merchant_id: String, $credit: Boolean, $debit: Boolean, $amount: Float, $category: String) {
    editTransaction(id: $id, user_id: $user_id, description: $description, merchant_id: $merchant_id, credit: $credit, debit: $debit, amount: $amount, category: $category) {
      id
      user_id
      merchant_id
      amount
      description
      credit
      debit
      category
    }
  }
`

const EditTransaction = (props) => {
  const [useCategory, setCategory] = useState('')
  const [useDescription, setDescription] = useState('')
  const [useAmount, setAmount] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [selectedUser, setSelectedUser] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [selectedMerchant, setMerchant] = useState('')
  const [creditOrDebit, setCreditOrDebit] = useState('')
  const classes = useStyles()
  const theme = useTheme()

  // eslint-disable-next-line camelcase
  // eslint-disable-next-line react/prop-types
  let { transaction_id } = props.match.params
  const { loading: merchantLoading, data: merchantData } = useQuery(GET_MERCHANT)
  const { loading: userLoading, data: userData } = useQuery(GET_USERS)
  const { loading: transactionLoading, error: transactionError, data: transactionData } = useQuery(GET_TRANSACTION, {
    variables: {
      id: transaction_id
    }
  })
  // eslint-disable-next-line no-unused-vars
  const [updateTransaction, { newTransactionData }] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }],
    onCompleted: () => props.history.push('/')
  })

  const handleUpdate = () => {
    let thisDescription = description
    let thisAmount = amount
    let thisMerchant = merchant_id
    let thisUser = user_id
    let thisCredit = credit
    let thisDebit = debit
    let thisCategory = category
    if (selectedUser.length > 0) {
      thisUser = selectedUser
    } if (useDescription.length > 0) {
      thisDescription = useDescription
    } if (selectedMerchant.length > 0) {
      thisMerchant = selectedMerchant
    } if (selectedUser.length > 0) {
      thisUser = selectedUser
    } if (useAmount.length > 0) {
      thisAmount = useAmount
    } if (useCategory.length > 0) {
      thisCategory = useCategory
    } if (creditOrDebit > 0) {
      thisCredit = creditOrDebit === 'Credit'
      thisDebit = creditOrDebit === 'Debit'
    }
    if ((useDescription.length < 1 && description.length < 1) || (useAmount.length < 1 && amount.length < 1) || (selectedMerchant.length < 1 && merchant_id.length < 1) || (selectedUser.length < 1 && user_id < 1) || creditOrDebit.length < 1) {
      alert('Please complete all inputs')
    } else if (isNaN(amount)) {
      alert('Amount must be a number.')
    } else {
      updateTransaction({
        variables: { 'id': transaction_id,
          'user_id': thisUser,
          'description': thisDescription,
          'merchant_id': thisMerchant,
          'credit': thisCredit,
          'debit': thisDebit,
          'category': thisCategory,
          'amount': parseInt(thisAmount)
        }
      })
    }
  }
  if (transactionLoading) return <h1> </h1>
  if (transactionError) return <h1> </h1>
  // eslint-disable-next-line no-unused-vars
  const { id, user_id, merchant_id, amount, description, credit, debit, category } = transactionData.transaction
  return (
    <Wrapper>
      <PageWrapper>
        <Title>Edit <br /> transaction</Title>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-name-label'>Merchant</InputLabel>
          <Select defaultValue={merchant_id} onChange={(e) => setMerchant(e.target.value)}>
            {transactionData.merchants.map(merchant => (
              <MenuItem key={merchant.id} value={merchant.id}>{ merchant.merchantName }</MenuItem>
            ))
            }
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-name-label'>User</InputLabel>
          <Select defaultValue={user_id} onChange={(e) => setSelectedUser(e.target.value)}>
            {transactionData.users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
            ))
            }
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-name-label'>Category</InputLabel>
          <Select
            onChange={(e) => setCategory(e.target.value)} defaultValue={category}
          >
            {Categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id='standard-multiline-flexible'
          label='Amount'
          placeholder='$'
          multiline
          rowsMax={4}
          defaultValue={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div style={{ display: 'flex' }}>
          <Radio checked={creditOrDebit === 'Credit'} id='radio-one' color='default' name='switch-one' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Credit' />
          <p htmlFor='radio-one' >Credit</p>
          <Radio checked={creditOrDebit === 'Debit'} id='radio-two' color='default' name='switch-two' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Debit' />
          <p htmlFor='radio-two' >Debit</p>
        </div>
        <TextField
          id='filled-multiline-static'
          label='Description'
          // placeholder="$"
          multiline
          rows={4}
          defaultValue='Default Value'
          variant='filled'
          onChange={(e) => setDescription(e.target.value)} defaultValue={description}
        />
      </PageWrapper>
      <Button style={{ width: '150px', color: 'gray', marginTop: '50px' }} onClick={() => handleUpdate()}variant='outlined'>SAVE</Button>
    </Wrapper>
  )
}
export default EditTransaction

const Icon = styled('i')`
outline: 0;
font-size: 30px;
color: black;
cursor: pointer;
margin-right: 5px;
`
const Flex = styled('div')`
display: flex;
align-items: center;
`
const flex = css`
display: flex;
`
const radioMargin = css`
margin-right: 10px;
`
