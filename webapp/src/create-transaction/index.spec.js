import React from 'react'
import { CreateTransaction } from '.'
import { fireEvent, render } from '@testing-library/react'
import * as apolloHooks from '@apollo/react-hooks'

describe('<CreateTransaction', () => {
  it('calls createTransaction with the given values', () => {
    const createTransaction = jest.fn()
    jest.spyOn(apolloHooks, 'useMutation').mockReturnValue([createTransaction])

    const { getByLabelText, getByText } = render(<CreateTransaction />)

    fireEvent.change(getByLabelText('Merchant Id:'), {
      target: {
        value: '123'
      }
    })

    fireEvent.change(getByLabelText('User Id:'), {
      target: {
        value: '456'
      }
    })

    fireEvent.change(getByLabelText('Amount:'), {
      target: {
        value: '10.24'
      }
    })

    fireEvent.click(getByLabelText('Credit:'))

    fireEvent.click(getByLabelText('Debit:'))

    fireEvent.change(getByLabelText('Description:'), {
      target: {
        value: 'description'
      }
    })

    fireEvent.click(getByText('Create Transaction'))

    expect(createTransaction).toHaveBeenCalledWith({
      variables: {
        amount: 10.24,
        description: 'description',
        isCredit: true,
        isDebit: true,
        merchantId: '123',
        userId: '456'
      }
    })
  })
})
