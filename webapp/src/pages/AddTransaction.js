/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from './ViewTransaction'
import gql from 'graphql-tag'
import styled from '@emotion/styled'

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
const AddTransaction = (props) => {
  const [creditOrDebit, setCreditOrDebit] = useState('Credit')
  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const { loading: merchantLoading, data: merchantData } = useQuery(GET_MERCHANT)
  const { loading: userLoading, data: userData } = useQuery(GET_USERS)
  const [addTransaction, { transactionData }] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }],
    onCompleted: () => props.history.push('/')
  }
  )

  function handleAdd () {
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
    <div>
      transaction

      <select onChange={(e) => setSelectedMerchant(e.target.value)} value={selectedMerchant}>
        <option value=''>Select...</option>
        {merchantData.merchants.map(merchant => (
          <option key={merchant.id} value={merchant.id}>{ merchant.merchantName }</option>
        ))
        }
      </select>

      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value=''>Select...</option>
        {userData.users.map(user => (
          <option key={user.id} value={user.id}>{ `${user.firstName} ${user.lastName}` }</option>
        ))
        }
      </select>

      <input onChange={(e) => setDescription(e.target.value)} value={description} />
      <div>
        <RadioBtn checked={creditOrDebit === 'Credit'} id='radio-one' name='switch-one' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Credit' />
        <label htmlFor='radio-one' >Credit</label>
        <RadioBtn checked={creditOrDebit === 'Debit'} id='radio-two' name='switch-two' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Debit' />
        <label htmlFor='radio-two' >Debit</label>
      </div>

      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value=''>Select...</option>
        <option value='Travel'>Travel</option>
        <option value='Equipment'>Equipment</option>
        <option value='Supplies'>Supplies</option>
        <option value='Misc'>Misc</option>
      </select>
      <input onChange={(e) => setAmount(e.target.value)} value={amount} />
      <button onClick={() => handleAdd()}>ADD TRANSACTION</button>

    </div>
  )
}

export default AddTransaction

export const RadioBtn = styled('input')`
margin-right: 10px;
cursor: pointer;
&:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
&:checked {
  &:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: black;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }
}
  `
