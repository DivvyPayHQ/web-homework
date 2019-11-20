import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import Transactions from './Transactions'

test('loads and displays the Transactions component', async () => {
  const { getByText } = render(<BrowserRouter><Transactions /></BrowserRouter>, { wrapper: MockedProvider })
  expect(getByText('Transactions')).toBeInTheDocument()

  await wait()
})
