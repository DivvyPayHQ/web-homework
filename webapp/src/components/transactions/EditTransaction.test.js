import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render } from '@testing-library/react'
import EditTransaction from './EditTransaction'

test('loads and displays the EditTransaction component', async () => {
  const props = {
    amount: 20,
    category: 'entertainment',
    credit: false,
    dateAdded: '2019/29/02',
    debit: true,
    description: 'Drinks',
    merchantId: '123',
    setEditFormShow: () => {},
    showEditFormId: '123d31a',
    transactionId: '123d31a'
  }
  const { getByText } = render(<BrowserRouter><EditTransaction {...props} /></BrowserRouter>, { wrapper: MockedProvider })
  expect(getByText('Edit Transaction')).toBeInTheDocument()
})
