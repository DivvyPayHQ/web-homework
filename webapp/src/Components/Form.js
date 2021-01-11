import React, { useState } from 'react'

// import axios from "axios";

const Form = () => {
  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [debit, setBebit] = useState('')
  const [credit, setCredit] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [editing, setEditing] = useState(false)

  // const newTransaction = {
  //   userId: userId,
  //   merchantId: merchantId,
  //   debit: debit,
  //   year: year,
  //   credit: credit,
  //   amount: amount
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`You have submitted the form. ${amount}`)
  }

  const toggle = () => {
    setToggleForm(!toggleForm)
  }

  return (
    <div className='wrapper'>
      <h1>Add new transactions</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className='radio'>
            <label>
              <input checked={false} type='radio' value='Debit' />
              Debit
            </label>
          </div>
          <div className='radio'>
            <label>
              <input onClick={() => setEditing(!editing)} type='radio' value='Credit' />
              Credit
            </label>
          </div>

          <label>
            <p>Amount</p>
            <input name='name' onChange={(e) => setAmount(e.target.value)} />
          </label>
        </fieldset>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Form
