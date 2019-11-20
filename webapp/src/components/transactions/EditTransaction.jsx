import React, { useState } from 'react'
import { css } from '@emotion/core'
import { useMutation } from '@apollo/react-hooks'
import { string, number, bool, func } from 'prop-types'

import { validateUploadedData } from '../../helpers/helpers.js'
import { UPDATE_TRANSACTION } from '../../queries/queries'

const EditTransaction = ({
  amount,
  category,
  credit,
  dateAdded,
  debit,
  description,
  merchantId,
  setEditFormShow,
  showEditFormId,
  transactionId
}) => {
  if (showEditFormId !== transactionId) {
    return null
  }

  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    amount: amount,
    debit: debit,
    credit: credit,
    description: description,
    merchant_id: merchantId,
    dateAdded: dateAdded,
    transactionId: transactionId,
    category: category,
    user_id: '123'
  })
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION)
  const handleFormInput = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.name === 'amount' ? parseFloat(e.target.value) : e.target.value
  })
  const handleRadioButtons = (e) => setFormData({
    ...formData,
    [e.target.value]: e.target.checked
  })
  const handleSubmit = () => {
    const validData = validateUploadedData([formData])

    if (!validData) {
      return setError(true)
    }

    setEditFormShow('')
    return updateTransaction({
      variables: formData
    })
  }

  return (
    <div className='edit-transaction-wrapper' css={editTransactionStyle}>
      <form className='edit-transaction-form' css={editTransactionForm}>
        {console.info('Editing:', description, amount, transactionId)}
        <h4>Edit Transaction</h4>
        {error && <p className='upload-error'>There was an error adding your transaction because one or more required fields are empty or null</p>}
        <div className='edit-transaction-form-wrapper'>
          <div className='input-wrapper'>
            <label htmlFor='amount'>Amount</label>
            <input id='amount' name='amount' onChange={handleFormInput} type='number' value={formData.amount || ''} />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='description'>Description</label>
            <input id='description' name='description' onChange={handleFormInput} type='text' value={formData.description} />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='category'>Category</label>
            <input id='category' name='category' onChange={handleFormInput} type='text' value={formData.category} />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='merchant_id'>Merchant ID</label>
            <input id='merchant_id' name='merchant_id' onChange={handleFormInput} type='text' value={formData.merchant_id} />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='dateAdded'>Date</label>
            <input id='dateAdded' name='dateAdded' onChange={handleFormInput} type='date' value={formData.dateAdded} />
          </div>
          <div className='input-wrapper debit-credit-wrapper'>
            <span className='credit-wrapper'>
              <label htmlFor='credit'>Credit</label>
              <input checked={formData.credit} id='credit' name='credit-debit' onChange={handleRadioButtons} type='radio' value='credit' />
            </span>
            <span className='debit-wrapper'>
              <label htmlFor='debit'>Debit</label>
              <input checked={formData.debit} id='debit' name='credit-debit' onChange={handleRadioButtons} type='radio' value='debit' />
            </span>
          </div>
        </div>
        <button className='submit-btn' onClick={handleSubmit} type='button'>SUBMIT</button>
      </form>
    </div>
  )
}

const editTransactionStyle = css`
  margin: 15px 0;

  .edit-transaction-btn,
  .submit-btn {
    appearance: none;
    background-color: #ffffff;
    border: none;
    border-radius: 3px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
    font-family: 'Calibre-Regular';
    font-size: 18px;
    padding: 8px 15px;

    &:hover,
    &:focus {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
      cursor: pointer;
    }
  }

  .submit-btn {
    border: 1px solid #000000;
    box-shadow: none;
    font-family: 'Calibre-Med';
    font-size: 13px;
  }
`

const editTransactionForm = css`
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  padding: 1px 20px 20px;

  h4 {
    margin: 15px 0 10px;
  }
  
  .edit-transaction-form-wrapper {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-bottom: 10px;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }

  .debit-credit-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  input {
    border-radius: 3px;
    border: 1px solid #aeada8;
    font-size: 14px;
    padding: 8px 15px;
    margin-right: 15px;
  }

  .credit-wrapper,
  .debit-wrapper {
    label {
      margin-right: 3px;
    }
  }

  .upload-error {
    background-color: rgba(157, 21, 47, 0.06);
    color: #9d152f;
    padding: 8px 15px;
  }
`

EditTransaction.propTypes = {
  amount: number.isRequired,
  category: string.isRequired,
  credit: bool.isRequired,
  dateAdded: string.isRequired,
  debit: bool.isRequired,
  description: string.isRequired,
  merchantId: string.isRequired,
  setEditFormShow: func.isRequired,
  showEditFormId: string.isRequired,
  transactionId: string.isRequired
}

export default EditTransaction
