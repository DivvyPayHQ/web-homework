import React, { useState } from 'react'
import FormInput from '../forms/form-input-component'
import { formContainerStyles } from './form-container-styles'

export function FormContainer () {
  const [state, setState] = useState({
    'Id': '',
    'UserId': ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  return (
    <div css={formContainerStyles}>
      <form className='transaction-form' >
        <FormInput
          label='Id'
          name='Id'
          onChange={handleChange}
          required
          type='text'
          value={`${state.Id}`}
          width='20px'
        />
        <FormInput
          label='User Id'
          name='UserId'
          onChange={handleChange}
          required
          type='text'
          value={`${state.UserId}`}
        />
      </form>
    </div>
  )
}
