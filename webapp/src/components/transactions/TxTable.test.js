import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/client/testing'
import TxTable from './TxTable'
import { transactions } from '../../../mocks/transactions-data'

describe('Transactions Table', () => {
  const mocks = []
  it('should match snapshot', () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <TxTable data={transactions} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  it('should show user "employee4" with amount "150"', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <TxTable data={transactions} />
      </MockedProvider>
    )
    const employee4Tx = transactions.find(tx => tx.user_id === 'employee4' && tx.amount === 150)
    const employee4TxRow = getByTestId(`transaction-${employee4Tx.id}-table-row`)
    expect(employee4TxRow).toBeInTheDocument()
  })
  it('should switch to edit mode when edit icon clicked', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <TxTable data={transactions} />
      </MockedProvider>
    )
    const employee4Tx = transactions.find(tx => tx.user_id === 'employee4' && tx.amount === 150)
    const employee4EditButton = getByTestId(`transaction-${employee4Tx.id}-edit-button`)
    fireEvent.click(employee4EditButton)
    const employee4InputField = getByTestId(`transaction-${employee4Tx.id}-user_id-input`)
    expect(employee4InputField).toBeInTheDocument()
  })
  it('should add transaction row when Add Transaction button clicked', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <TxTable data={transactions} />
      </MockedProvider>
    )
    const txAddButton = getByTestId(`transaction-add-button`)
    fireEvent.click(txAddButton)
    const newInputField = getByTestId(`transaction--user_id-input`)
    expect(newInputField).toBeInTheDocument()
  })
  it('should delete row when delete button clicked', () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <TxTable data={transactions} />
      </MockedProvider>
    )
    const employee4Tx = transactions.find(tx => tx.user_id === 'employee4' && tx.amount === 150)
    const employee4DeleteButton = getByTestId(`transaction-${employee4Tx.id}-delete-button`)
    fireEvent.click(employee4DeleteButton)
    const deletedRow = queryByTestId(`transaction--user_id-input`)
    expect(deletedRow).not.toBeInTheDocument()
  })
})
