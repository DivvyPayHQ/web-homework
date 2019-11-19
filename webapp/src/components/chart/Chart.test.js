import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import Chart from './Chart'

test('loads and displays the Chart component', async () => {
  const { getByText } = render(<BrowserRouter><Chart /></BrowserRouter>, { wrapper: MockedProvider })

  expect(getByText('What you\'re spending your money on:')).toBeInTheDocument()
  await wait()
})
