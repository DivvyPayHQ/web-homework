import { useNavigate } from 'react-router-dom'

import { RowRenderer, _sortTable } from '../../components/transactions/TxTable'

import { render, getByTestId, fireEvent } from '../../utils/testUtils'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('TransactionTable', () => {
  describe('RowRenderer', () => {
    let rowRendererData = [{
      id: '1',
      date: '12-12-21',
      description: 'monies',
      user: { first_name: 'Bob', last_name: 'Dole' },
      merchant: { name: 'Bezos' },
      amount: 100,
      credit: true
    }]

    let sharedContainer
    let sharedGetByText

    beforeEach(() => {
      const { container, getByText } = render(<RowRenderer data={rowRendererData} index={0} />)
      sharedContainer = container
      sharedGetByText = getByText
    })

    it('should render all the data for each row', () => {
      const element = getByTestId(sharedContainer, 'transaction-1-date')

      expect(element).toHaveTextContent(rowRendererData[0].date)
    })

    it('should render users full name for each row', () => {
      const element = getByTestId(sharedContainer, 'transaction-1-users-name')

      expect(element).toHaveTextContent('Bob Dole')
    })

    it('should render the merchant name', () => {
      const element = getByTestId(sharedContainer, 'transaction-1-merchant')

      expect(element).toHaveTextContent('Bezos')
    })

    it('should render the description', () => {
      const element = getByTestId(sharedContainer, 'transaction-1-description')

      expect(element).toHaveTextContent('monies')
    })

    it('should render the amount formatted', () => {
      const element = getByTestId(sharedContainer, 'transaction-1-amount')

      expect(element).toHaveTextContent('$100')
    })

    it('should render an edit button that navigates to edit the transaction', () => {
      fireEvent.click(sharedGetByText('Edit'))
      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('./1')
    })
  })

  describe('_sortTable', () => {
    const data = [
      { foo: 1, bar: 'a'},
      { foo: 3, bar: 'c'},
      { foo: 2, bar: 'b'}
    ]

    it('should sort the numbers in ascending order', () => {
      const res = _sortTable(data, 'foo', 'ASC')

      expect(res[0].foo).toEqual(1)
      expect(res[2].foo).toEqual(3)
    })

    it('should sort the numbers in descending order', () => {
      const res = _sortTable(data, 'foo', 'DESC')

      expect(res[0].foo).toEqual(3)
      expect(res[2].foo).toEqual(1)
    })

    it('should sort the letters in ascending order', () => {
      const res = _sortTable(data, 'bar', 'ASC')

      expect(res[0].bar).toEqual('a')
      expect(res[2].bar).toEqual('c')
    })

    it('should sort the numbers in descending order', () => {
      const res = _sortTable(data, 'bar', 'DESC')

      expect(res[0].bar).toEqual('c')
      expect(res[2].bar).toEqual('a')
    })
  })
})

