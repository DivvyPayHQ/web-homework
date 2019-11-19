import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import Upload from './Upload'

test('loads and displays the Upload component', async () => {
  const { getByText } = render(<BrowserRouter><Upload /></BrowserRouter>, { wrapper: MockedProvider })

  expect(getByText('Upload')).toBeInTheDocument()
  expect(getByText('Upload your CSV file of transactions below.')).toBeInTheDocument()
  await wait()
})
