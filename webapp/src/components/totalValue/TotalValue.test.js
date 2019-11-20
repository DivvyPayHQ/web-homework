import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import TotalValue from './TotalValue'

test('loads and displays the TotalValue component', async () => {
  const { getByText } = render(<BrowserRouter><TotalValue /></BrowserRouter>, { wrapper: MockedProvider })

  expect(getByText('Balance:')).toBeInTheDocument()
  expect(getByText('Credits: $')).toBeInTheDocument()
  expect(getByText('Debits: $')).toBeInTheDocument()
  await wait()
})
