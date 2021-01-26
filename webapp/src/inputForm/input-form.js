import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactionById from '../gql/transactionById.gql'
import axios from 'axios'
const FormData = require('form-data')

export function InputForm () {
  const dataDefaults = {
    transaction: {
      user_id: '',
      merchant_id: '',
      description: '',
      debit: true,
      credit: false,
      amount: 0
    }
  }

  const [transaction, setTransaction] = useState(dataDefaults.transaction)
  const [changeInProgress, setChangeInProgress] = useState(false)

  const getOneTransaction = (id) => {
    if (id) {
      return useQuery(GetTransactionById, { variables: { id } })
    } else {
      return {
        loading: false,
        error: false,
        data: dataDefaults
      }
    }
  }

  let id = window.location.pathname.split('/add/')[1]
  const { loading, error, data } = getOneTransaction(id)

  useEffect(() => {
    if (data && !changeInProgress) {
      setTransaction(data.transaction)
      setChangeInProgress(false)
    }
  },
  [data])

  const mutationQuery = `mutation add($user_id:String,$description:String,$merchant_id:String,$debit:Boolean,$credit:Boolean,$amount:Float){addTransaction(user_id:$user_id,description:$description,merchant_id:$merchant_id,debit:$debit,credit:$credit,amount:$amount){user_id,description,merchant_id,debit,credit,amount}}`

  const parseFormData = (name) => {
    let entries = new FormData(document.getElementById(name)).entries()
    let result = {}

    for (let entry of entries) {
      if (entry[0] === 'type') {
        result.debit = entry[1] === 'debit'
        result.credit = entry[1] === 'credit'
      } else if (entry[0] === 'amount') {
        result.amount = parseFloat(entry[1])
      } else {
        result[entry[0]] = entry[1]
      }
    }
    return result
  }

  const handleChange = (field, value) => {
    setChangeInProgress(true)
    let transactionCopy = JSON.parse(JSON.stringify(transaction))
    transactionCopy[field] = value
    setTransaction(transactionCopy)
  }

  const submitForm = (event) => {
    event.preventDefault()
    const fields = parseFormData('transaction-form')

    axios.post('http://localhost:8000/graphql', {
      query: mutationQuery,
      variables: fields
    })
  }

  if (loading) {
    return (
      <>
        Loading...
      </>
    )
  }

  if (error) {
    return (
      <>
        ¯\_(ツ)_/¯
      </>
    )
  }

  return (
    <form id='transaction-form'>
      <h4>Add a Transaction:</h4>
      <label htmlFor='user_id' required>{'User ID: '}
        <input
          name='user_id'
          onChange={(e) => handleChange('user_id', e.target.value)}
          type='text'
          value={transaction ? transaction.user_id : ''} />
      </label><br />
      <label htmlFor='merchant_id' required>{'Merchant ID: '}
        <input
          name='merchant_id'
          onChange={(e) => handleChange('merchant_id', e.target.value)}
          type='text'
          value={transaction ? transaction.merchant_id : ''} />
      </label><br />
      <label htmlFor='description' required>{'Description: '}
        <input
          name='description'
          onChange={(e) => handleChange('description', e.target.value)}
          type='text'
          value={transaction ? transaction.description : ''} />
      </label><br />
      <label>
        <input
          checked={transaction ? transaction.debit : false}
          name={'type'}
          onChange={(e) => handleChange('debit', e.target.value)}
          required
          type='radio'
          value={'debit'} />{'Debit'}
      </label><br />
      <label>
        <input
          checked={transaction ? transaction.credit : false}
          name={'type'}
          onChange={(e) => handleChange('credit', e.target.value)}
          type='radio'
          value={'credit'} />{'Credit'}
      </label><br />
      <label htmlFor='amount' required>{'Amount: '}
        <input
          name='amount'
          onChange={(e) => handleChange('amount', e.target.value)}
          type='number'
          value={transaction ? transaction.amount : ''} />
      </label><br />
      <button onClick={(e) => submitForm(e)}>Submit!</button>
    </form>
  )
}
