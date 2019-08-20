import { Transaction } from '.'
import { render } from '@testing-library/react'
import * as apolloHooks from '@apollo/react-hooks'

describe('<Transaction />', () => {
  it('renders a transaction', () => {
    const transaction = {
      amount: 10.24,
      credit: false,
      debit: true,
      description: 'description',
      user_id: 'userId',
      merchant_id: 'merchantId'
    }
    jest.spyOn(apolloHooks, 'useQuery').mockReturnValue({ data: { transaction } })

    const { getByText } = render(<Transaction match={{ params: {} }} />)

    expect(getByText('10.24'))
    expect(getByText('false'))
    expect(getByText('true'))
    expect(getByText('description'))
    expect(getByText('userId'))
    expect(getByText('merchantId'))
  })
})
