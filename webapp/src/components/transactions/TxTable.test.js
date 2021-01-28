import { render } from '@testing-library/react'
import { TxTable } from './TxTable'
import { transactions } from '../../../mocks/transactions-data'

describe('Transactions Table', () => {
  it('should show user "employee4" with amount "150"', () => {
    const {container, getByText} = render(<TxTable data={transactions}/>)
    expect(getByText('employee4')).toBeInTheDocument()
    expect(getByText('150')).toBeInTheDocument()
  })

})
