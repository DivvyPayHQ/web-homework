import React, { useState } from 'react'
import { FormInput } from '../forms/form-input-component'
import { formContainerStyles } from './form-container-styles'
import { Button } from '../buttons/plusButton'

export function FormContainer () {
  const [state, setState] = useState({
    'Id': '',
    'UserId': ''
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
          label='Id'
          name='Id'
          onChange={handleChange}
          required
          type='text'
          value={`${state.Id}`}
          width='10px'
        />
        <FormInput
          label='User Id'
          name='UserId'
          onChange={handleChange}
          required
          type='text'
          value={`${state.UserId}`}
        />
        <FormInput
          label='User Id'
          name='UserId'
          onChange={handleChange}
          required
          type='text'
          value={`${state.UserId}`}
        />
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
        <FormInput
          label='User Id'
          name='UserId'
          onChange={handleChange}
          required
          type='text'
          value={`${state.UserId}`}
        />
        <Button onClickfunction={onSubmit} />
      </form>
    </div>
  )
}
