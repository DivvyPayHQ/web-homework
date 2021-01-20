import React from 'react'

export function InputForm () {
  return (
    <form>
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
      <button>Submit!</button>
    </form>
  )
}
