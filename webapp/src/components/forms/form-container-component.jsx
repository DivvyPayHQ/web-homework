import React from 'react'
import { FormInput } from '../forms/form-input-component'
import { formContainerStyles } from './form-container-styles'
import { Button } from '../buttons/plusButton'
import { array, func } from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import { addTransaction, GetTransactions } from '../../gql/transactions.gql.js'

export function FormContainer ({ setState, setHidden, setQData, ...state }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }
  const [createTransactionMutation] = useMutation(addTransaction, {
    refetchQueries: [
      'GetTransactions'
    ]
  })

  const { data = {} } = useQuery(GetTransactions)
  if (data.length) {
    setQData(data)
  }

  const onSubmit = () => {
    // This is where I would send the Gql mutate call if the backend  had one set up
    setState({ ...state, amount: parseInt(state.amount) })
    createTransactionMutation({ variables: state })
    setHidden(true)
    window.location.reload(false)
  }

  return (
    <div css={formContainerStyles}>
      <form className='transaction-form' >
        <FormInput
          label='User Id'
          name='user_id'
          onChange={handleChange}
          required
          type='text'
          value={`${state.user_id}`}
        />
        <FormInput
          label='Description'
          name='description'
          onChange={handleChange}
          required
          type='text'
          value={`${state.description}`}
        />
        <FormInput
          label='Merchant Id'
          name='merchant_id'
          onChange={handleChange}
          required
          type='text'
          value={`${state.merchant_id}`}
          width='20px'
        />
        <FormInput
          label='Debit'
          name='debit'
          onChange={handleChange}
          required
          type='text'
          value={`${state.debit}`}
        />
        <FormInput
          label='Credit'
          name='credit'
          onChange={handleChange}
          required
          type='text'
          value={`${state.credit}`}
        />
        <FormInput
          label='Amount'
          name='amount'
          onChange={handleChange}
          required
          type='text'
          value={`${state.amount}`}
        />
        <Button icon={'+'} onClickfunction={onSubmit} />
      </form>
    </div>
  )
}

FormContainer.propTypes = {
  state: array,
  setState: func,
  setHidden: func,
  setQData: func
}
