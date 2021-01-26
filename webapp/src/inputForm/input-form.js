import React from 'react'
import axios from 'axios'
const FormData = require('form-data')

export function InputForm () {
  const mutationQuery = `mutation add($user_id:String,$description:String,$merchant_id:String,$debit:Boolean,$credit:Boolean,$amount:Float){addTransaction(user_id:$user_id,description:$description,merchant_id:$merchant_id,debit:$debit,credit:$credit,amount:$amount){user_id,description,merchant_id,debit,credit,amount}}`

  const submitForm = function (event) {
    event.preventDefault()
    let result = {}

    let formEntries = new FormData(document.getElementById('transaction-form')).entries()

    for (let entry of formEntries) {
      if (entry[0] === 'type') {
        result.debit = entry[1] === 'debit'
        result.credit = entry[1] === 'credit'
      } else if (entry[0] === 'amount') {
        result.amount = parseFloat(entry[1])
      } else {
        result[entry[0]] = entry[1]
      }
    }

    axios.post(`http://localhost:8000/graphql`, {
      query: mutationQuery,
      variables: result
    })
  }

  return (
    <form id='transaction-form'>
      <h4>Add a Transaction:</h4>
      <label htmlFor='user_id' required>
        {`User ID: `}
        <input name='user_id' type='text' />
      </label><br />
      <label htmlFor='merchant_id' required>
        {`Merchant ID: `}
        <input name='merchant_id' type='text' />
      </label><br />
      <label htmlFor='description' required>
        {`Description: `}
        <input name='description' type='text' />
      </label><br />
      <label>
        <input name={'type'} required type='radio' value={'debit'} />
        Debit
      </label><br />
      <label>
        <input name={'type'} type='radio' value={'credit'} />
        Credit
      </label><br />
      <label htmlFor='amount' required>
        {`Amount: `}
        <input name='amount' type='number' />
      </label><br />
      <button onClick={(e) => submitForm(e)}>Submit!</button>
    </form>
  )
}
