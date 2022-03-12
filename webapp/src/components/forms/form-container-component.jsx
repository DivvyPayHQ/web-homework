import React from 'react'
import { FormInput } from '../forms/form-input-component'
import { formContainerStyles } from './form-container-styles'
import { Button } from '../buttons/plusButton'
import { array, func, bool } from 'prop-types'
import { useMutation } from '@apollo/client'
import { isNumeric } from '../../utils/isNumeric'
import { addTransaction, GetTransactions, updateTransaction } from '../../gql/transactions.gql.js'

export function FormContainer ({ setState, setHidden, setQData, isEditing, ...state }) {
  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }
  const [createTransactionMutation] = useMutation(addTransaction, {
    refetchQueries: [
      { query: GetTransactions },
      'GetTransactions'
    ]
  })
  const [createUpdateTransaction] = useMutation(updateTransaction, {
    refetchQueries: [
      { query: GetTransactions },
      'GetTransactions'
    ]
  })

  const onSubmit = () => {
    if (isNumeric(state.amount)) {
      state.amount = parseFloat(state.amount)
    } else {
      state.amount = 0
    }
    state.credit = (state.credit === 'true' || state.credit === true)
    state.debit = (state.debit === 'true' || state.debit === true)
    if (isEditing) {
      createUpdateTransaction({ variables: state })
      setHidden(true)
    } else {
      createTransactionMutation({ variables: state })
      setHidden(true)
    }
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
  setQData: func,
  isEditing: bool
}
