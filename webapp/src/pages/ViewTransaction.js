/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { RadioBtn } from './AddTransaction'
import { PieChart } from '../components/Charts/PieChart'

export const GET_TRANSACTIONS = gql`
  query GetTransactions($user_id: String, $merchant_id: String) {
    transactions(user_id: $user_id, merchant_id: $merchant_id) {
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

const TransactionView = (props) => {
  const { loading: transactionsLoading, error: transactionsError, data: transactionData, refetch } = useQuery(GET_TRANSACTIONS)

  const [selectedMerchant, setSelectedMerchant] = useState('')
  const [numbersOrRoman, setNumbersOrRoman] = useState('Numbers')
  const [selectedUser, setSelectedUser] = useState('')

  function handleFilter () {
    var variable = {
      'user_id': selectedUser,
      'merchant_id': selectedMerchant
    }
    if (selectedUser.length < 1) {
      delete variable.user_id
    }
    if (selectedMerchant.length < 1) {
      delete variable.merchant_id
    }
    if (Object.entries(variable).length > 0) {
      refetch(variable)
    } else {
      refetch()
    }
  }
  if (transactionsLoading) return <h1> </h1>
  if (transactionsError) return <h1> </h1>
  return (
    <Fragment>
      <div >
        <div >
          <div >
            <h3>Filter</h3>
            <p>MERCHANTS</p>
            <Fragment>
              <div>
                <div>
                  <select onChange={(e) => setSelectedMerchant(e.target.value)} value={selectedMerchant}>
                    <option value=''>None</option>
                    {transactionData.merchants.map(merchant => (
                      <option key={merchant.id} value={merchant.id}>{ merchant.merchantName }</option>
                    ))
                    }
                  </select>
                </div>
              </div>
            </Fragment>
            <br />
            <p>USER</p>
            <Fragment>
              <div>
                <div>
                  <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
                    <option value=''>None</option>
                    {transactionData.users.map(user => (
                      <option key={user.id} value={user.id}>{ `${user.firstName} ${user.lastName}` }</option>
                    ))
                    }
                  </select>
                </div>
              </div>
            </Fragment>
            <br />
            <button onClick={() => handleFilter()}>SUBMIT</button>
            <br />
            <br />
            <p>TOGGLE</p>
            <div>
              <RadioBtn checked={numbersOrRoman === 'Numbers'} id='radio-one' name='switch-one' onChange={(e) => setNumbersOrRoman(e.target.value)} type='radio' value='Numbers' />
              <label htmlFor='radio-one' >Numbers</label>
              <RadioBtn checked={numbersOrRoman === 'Roman'} id='radio-two' name='switch-two' onChange={(e) => setNumbersOrRoman(e.target.value)} type='radio' value='Roman' />
              <label htmlFor='radio-two' >Roman</label>
            </div>
          </div>
          <div>
            <PieChart transactions={transactionData.transactions} />
          </div>
        </div>
        <br />
        <div>
          <h1>Transactions</h1>
          <Fragment>
            <div />
            {
              transactionData.transactions.map(transaction => (
                <div key={transaction.id} romanCheck={numbersOrRoman === 'Numbers'} transaction={transaction} />
              ))
            }
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}
export default TransactionView
