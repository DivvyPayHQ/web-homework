/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_TRANSACTIONS } from './ViewTransaction'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { RadioBtn } from './AddTransaction'

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
  const [selectedUser, setUser] = useState('')
  const [selectedMerchant, setMerchant] = useState('')
  const [creditOrDebit, setCreditOrDebit] = useState('')
  // eslint-disable-next-line camelcase
  // eslint-disable-next-line react/prop-types
  let { transaction_id } = props.match.params
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

  function handleUpdate () {
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
    <div>
      <div>
        <Link to={`/`}><Icon className='material-icons'>clear</Icon></Link>
        <h3>Edit transaction</h3>
      </div>
      <Fragment>
        <p>MERCHANT</p>
        {/* <OuterSelectContainer> */}
        <div>
          <select defaultValue={merchant_id} onChange={(e) => setMerchant(e.target.value)}>
            <option value=''>Select...</option>
            {transactionData.merchants.map(merchant => (
              <option key={merchant.id} value={merchant.id}>{ merchant.merchantName }</option>
            ))
            }
          </select>
        </div>
        {/* </OuterSelectContainer> */}
      </Fragment>
      <br />
      <Fragment>
        <p>USER</p>
        {/* <OuterSelectContainer> */}
        <div>
          <select defaultValue={user_id} onChange={(e) => setUser(e.target.value)}>
            <option value=''>Select...</option>
            {transactionData.users.map(user => (
              <option key={user.id} value={user.id}>{ `${user.firstName} ${user.lastName}` }</option>
            ))
            }
          </select>
        </div>
        {/* </OuterSelectContainer> */}
      </Fragment>
      <br />
      <p>DESCRIPTION</p>
      <input defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <p>TYPE</p>
      <div css={flex}>
        <RadioBtn checked={creditOrDebit === 'Credit'} id='radio-one' name='switch-one' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Credit' />
        <p css={radioMargin} htmlFor='radio-one' >Credit</p>
        <RadioBtn checked={creditOrDebit === 'Debit'} id='radio-two' name='switch-two' onChange={(e) => setCreditOrDebit(e.target.value)} type='radio' value='Debit' />
        <p htmlFor='radio-two' >Debit</p>
      </div>
      <br />
      <p>AMOUNT</p>
      <input defaultValue={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <div>
        <p>CATEGORY</p>
        {/* <OuterSelectContainer> */}
        <div>
          <select defaultValue={category} onChange={(e) => setCategory(e.target.value)} >
            <option value=''>Select...</option>
            <option value='Travel'>Travel</option>
            <option value='Equipment'>Equipment</option>
            <option value='Supplies'>Supplies</option>
            <option value='Misc'>Misc</option>
          </select>
        </div>
        {/* </OuterSelectContainer> */}
      </div>
      <br />
      <button onClick={() => handleUpdate()}>SAVE CHANGES</button>
    </div>
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
// eslint-disable-next-line no-unused-vars
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
