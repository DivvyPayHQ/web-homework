import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait, fireEvent } from '@testing-library/react'
import AddTransaction from './AddTransaction'

test('loads and displays the AddTransaction component', async () => {
  const { getByText } = render(<BrowserRouter><AddTransaction /></BrowserRouter>, { wrapper: MockedProvider })
  expect(getByText('+ Add Transaction')).toBeInTheDocument()

  fireEvent.click(getByText('+ Add Transaction'))

  expect(getByText('Cancel')).toBeInTheDocument()
  expect(getByText('Add New Transaction')).toBeInTheDocument()
  await wait()
})
