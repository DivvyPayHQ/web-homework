import React from 'react'
const FormData = require('form-data')

export function InputForm () {
  const submitForm = function (event) {
    event.preventDefault()
    let result = {}

    let formEntries = new FormData(document.getElementById('transaction-form')).entries()

    for (let entry of formEntries) {
      result[entry[0]] = entry[1]
    }
  }

  return (
    <form id='transaction-form'>
      <h4>Add a Transaction:</h4>
      <label htmlFor='user_id' required='true'>
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
      <select required>
        <option name={'debit'}>Expense</option>
        <option name={'credit'}>Income</option>
      </select><br />
      <label htmlFor='amount' required>
        {`Amount: `}
        <input name='amount' type='number' />
      </label><br />
      <button onClick={(e) => submitForm(e)}>Submit!</button>
    </form>
  )
}
