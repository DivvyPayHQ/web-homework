import React from 'react'
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

  const submitForm = (event) => {
    event.preventDefault()
    const fields = parseFormData('transaction-form')

    axios.post(`http://localhost:8000/graphql`, {
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
      <label htmlFor='user_id' required>
        {`User ID: `}
        <input name='user_id' type='text' value={data.transaction.user_id} />
      </label><br />
      <label htmlFor='merchant_id' required>
        {`Merchant ID: `}
        <input name='merchant_id' type='text' value={data.transaction.merchant_id} />
      </label><br />
      <label htmlFor='description' required>
        {`Description: `}
        <input name='description' type='text' value={data.transaction.description} />
      </label><br />
      <label>
        <input checked={data.transaction.debit} name={'type'} required type='radio' value={'debit'} />
        Debit
      </label><br />
      <label>
        <input checked={data.transaction.credit} name={'type'} type='radio' value={'credit'} />
        Credit
      </label><br />
      <label htmlFor='amount' required>
        {`Amount: `}
        <input name='amount' type='number' value={data.transaction.amount} />
      </label><br />
      <button onClick={(e) => submitForm(e)}>Submit!</button>
    </form>
  )
}
