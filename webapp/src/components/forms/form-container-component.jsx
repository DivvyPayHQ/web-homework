import React, { useState } from 'react'
import { FormInput } from '../forms/form-input-component'
import { formContainerStyles } from './form-container-styles'
import { Button } from '../buttons/plusButton'

export function FormContainer () {
  const [state, setState] = useState({
    'Id': '',
    'UserId': '',
    'Description': '',
    'MerchantId': '',
    'Debit': '',
    'Credit': '',
    'Amount': ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  const onSubmit = () => {

  }

  return (
    <div css={formContainerStyles}>
      <form className='transaction-form' >
        <FormInput
          label='User Id'
          name='UserId'
          onChange={handleChange}
          required
          type='text'
          value={`${state.UserId}`}
        />
        <FormInput
          label='Description'
          name='Description'
          onChange={handleChange}
          required
          type='text'
          value={`${state.Description}`}
        />
        <FormInput
          label='Merchant Id'
          name='MerchantId'
          onChange={handleChange}
          required
          type='text'
          value={`${state.MerchantId}`}
          width='20px'
        />
        <FormInput
          label='Debit'
          name='Debit'
          onChange={handleChange}
          required
          type='text'
          value={`${state.Debit}`}
        />
        <FormInput
          label='Credit'
          name='Credit'
          onChange={handleChange}
          required
          type='text'
          value={`${state.Credit}`}
        />
        <FormInput
          label='Amount'
          name='Amount'
          onChange={handleChange}
          required
          type='text'
          value={`${state.Amount}`}
        />
        <Button icon={'+'} onClickfunction={onSubmit} />
      </form>
    </div>
  )
}
