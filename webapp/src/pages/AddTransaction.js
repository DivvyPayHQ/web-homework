/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_TRANSACTIONS } from './ViewTransaction'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { PageWrapper, Title, Label } from './AddUser'
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
const ADD_TRANSACTION = gql`
  mutation AddTransactions($user_id: String, $description: String, $merchant_id: String, $credit: Boolean, $debit: Boolean, $amount: Float, $category: String) {
    addTransaction(user_id: $user_id, description: $description, merchant_id: $merchant_id, credit: $credit, debit: $debit, amount: $amount, category: $category) {
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

export const GET_USERS = gql`
  query GetUsers {
    users {
        id
        firstName
        lastName
    }
  }
`
export const GET_MERCHANT = gql`
  query GetMerchant {
    merchants {
        id
        merchantName
    }
  }
`

export const Categories = [
'Travel',
'Equipment',
'Supplies',
'Misc'
]

export const useStyles = makeStyles((theme) => ({

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

export const ITEM_HEIGHT = 48
export const ITEM_PADDING_TOP = 8
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}
const AddTransaction = (props) => {
  const [creditOrDebit, setCreditOrDebit] = useState('Credit')
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const { loading: merchantLoading, data: merchantData } = useQuery(GET_MERCHANT)
  const { loading: userLoading, data: userData } = useQuery(GET_USERS)
  const classes = useStyles()
  const theme = useTheme()

  const [addTransaction, { transactionData }] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }],
    onCompleted: () => props.history.push('/')
  }
  )

  const handleAdd = () => {
    if (description.length < 1 || amount.length < 1 || selectedMerchant.length < 1 || selectedUser.length < 1 || category.length < 1) {
      // eslint-disable-next-line no-undef
      alert('Please complete all inputs')
    } else if (isNaN(amount)) {
      // eslint-disable-next-line no-undef
      alert('Amount must be a number.')
    } else {
      addTransaction({
        variables: { 'user_id': selectedUser,
          'description': description,
          'merchant_id': selectedMerchant,
          'credit': creditOrDebit === 'Credit',
          'debit': creditOrDebit === 'Debit',
          'category': category,
          'amount': parseInt(amount)
        }
      })
      setDescription('')
      setAmount('')
    }
  }

  if (merchantLoading) return <h1>Loading</h1>
  if (userLoading) return <h1>Loading</h1>

  return (
    <Wrapper>
      <PageWrapper>
        <Title>Add <br /> Transaction</Title>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-name-label'>Merchant</InputLabel>
          <Select
            id="demo-mutiple-name"
          input={<Input />}
          labelId="demo-mutiple-name-label"
          MenuProps={MenuProps}
          onChange={(e) => setSelectedMerchant(e.target.value)}
          value={selectedMerchant}
          >
            {merchantData.merchants.map((merchant) => (
              <MenuItem key={merchant.id} style={getStyles(name, selectedMerchant, theme)} value={merchant.id}>
                {merchant.merchantName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-name-label'>Name</InputLabel>
          <Select
            id="demo-mutiple-name"
          input={<Input />}
          labelId="demo-mutiple-name-label"
          MenuProps={MenuProps}
          onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}
          value={selectedUser}
          >
            {userData.users.map((user) => (
              <MenuItem key={user.id} style={getStyles(name, selectedUser, theme)} value={user.id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-name-label'>Category</InputLabel>
          <Select

            id="demo-mutiple-name"
          input={<Input />}
          labelId="demo-mutiple-name-label"
          MenuProps={MenuProps}
          onChange={(e) => setCategory(e.target.value)} value={category}
          value={category}
          placeholder="category"
          >
            {Categories.map((category) => (
              <MenuItem key={category} value={category} style={getStyles(name, category, theme)}>
                {category}
              </MenuItem>
          ))}
          </Select>
        </FormControl>
        <TextField
          id="standard-multiline-flexible"
          label="Amount"
          placeholder="$"
          multiline
          rowsMax={4}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div>
          <Radio checked={creditOrDebit === 'Credit'} color='default' id='radio-one' name='switch-one' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Credit' />
          <label htmlFor='radio-one' >Credit</label>
          <Radio checked={creditOrDebit === 'Debit'} color='default' id='radio-two' name='switch-two' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Debit' />
          <label htmlFor='radio-two' >Debit</label>
        </div>
        <TextField
          id="filled-multiline-static"
          label="Description"
          // placeholder="$"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
          onChange={(e) => setDescription(e.target.value)} value={description}
        />
      </PageWrapper>
      <Link style={{ textDecoration: 'none' }} to="/"><Button style={{ width: '150px', color: 'gray', marginTop: '50px' }} onClick={() => handleAdd()} variant='outlined'>ADD</Button></Link>
    </Wrapper>
  )
}

export default AddTransaction

const Wrapper = styled('div')`
min-height: 700px;
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
}
`
