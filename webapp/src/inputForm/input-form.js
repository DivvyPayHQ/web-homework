import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactionById from '../gql/transactionById.gql'
import axios from 'axios'
const FormData = require('form-data')
const SERVER_URL = 'http://localhost:8000/graphql'

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
  const [changeHasBegun, setChangeHasBegun] = useState(false)
  const [message, setMessage] = useState('')
  // existing transaction: special handling needed for submittal
  // const [isExistingTransaction, setIsExistingTransaction] = useState(false)

  const getOneTransaction = (id) => {
    if (id) {
      // setIsExistingTransaction(true)
      return useQuery(GetTransactionById, { variables: { id } })
    } else {
      return {
        loading: false,
        error: false,
        data: dataDefaults
      }
    }
  }

  const id = window.location.pathname.split('/add/')[1]
  const { loading, error, data } = getOneTransaction(id)

  useEffect(() => {
    if (data && !changeHasBegun) {
      setTransaction(data.transaction)
    }
  },
  [data])

  const additionQuery = `mutation add($user_id:String,$description:String,$merchant_id:String,$debit:Boolean,$credit:Boolean,$amount:Float){addTransaction(user_id:$user_id,description:$description,merchant_id:$merchant_id,debit:$debit,credit:$credit,amount:$amount){user_id,description,merchant_id,debit,credit,amount}}`

  const updateQuery = `mutation edit($id:String,$user_id:String,$description:String,$merchant_id:String,$debit:Boolean,$credit:Boolean,$amount:Float){editTransaction(id:$id,user_id:$user_id,description:$description,merchant_id:$merchant_id,debit:$debit,credit:$credit,amount:$amount){id,user_id,description,merchant_id,debit,credit,amount}}`

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

  const handleDebitCreditChange = (field) => {
    let otherField = 'debit'
    if (field === 'debit') {
      otherField = 'credit'
    }
    // field already checked? no change
    // otherwise, set selected field to true and other to false
    if (!transaction[field]) {
      let transactionCopy = JSON.parse(JSON.stringify(transaction))
      transactionCopy[field] = true
      transactionCopy[otherField] = false
      setTransaction(transactionCopy)
    }
  }

  const handleChange = (field, value) => {
    setChangeHasBegun(true)
    if (field === 'debit' || field === 'credit') {
      handleDebitCreditChange(field)
    } else {
      let transactionCopy = JSON.parse(JSON.stringify(transaction))
      transactionCopy[field] = value
      setTransaction(transactionCopy)
    }
  }

  const submitNewTransaction = (fields) => {
    axios.post(SERVER_URL, {
      query: additionQuery,
      variables: fields
    })
      .then(() => {
        setMessage('Transaction Added!')
        setTransaction(dataDefaults)
      })
      .catch(() => setMessage('Something went wrong. Try again'))
  }

  const submitEdit = (fields) => {
    // include id in query
    fields.id = id
    axios.post(SERVER_URL, {
      query: updateQuery,
      variables: fields
    })
      .then(() => {
        setMessage('Transaction Edited!')
        setTransaction(dataDefaults)
      })
      .catch(() => setMessage('Something went wrong. Try again'))
  }

  const submitForm = (event) => {
    event.preventDefault()
    const fields = parseFormData('transaction-form')

    if (id) {
      submitEdit(fields)
    } else {
      submitNewTransaction(fields)
    }
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
      <p>{message}</p>
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
