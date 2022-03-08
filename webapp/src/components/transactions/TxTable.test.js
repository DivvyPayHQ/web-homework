import { render } from '@testing-library/react'
import TxTable from './TxTable'

describe('Transactions Table', () => {
  it('Example: should show user "employee4" with amount "150"', () => {
    const { getByTestId } = render(
      <TxTable
        data={[{
          id: 'txn:1',
          user_id: 'employee4',
          merchant_id: 'mer:1',
          amount: 150
        }]}
      />
    )
    expect(getByTestId('transaction-txn:1')).toBeVisible()
    expect(getByTestId('transaction-txn:1-amount')).toHaveTextContent('150')
  })
})
