import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import Nav from './Nav'

test('loads and displays the Nav component and the navigation links', async () => {
  const { getByText, getByRole } = render(<BrowserRouter><Nav /></BrowserRouter>)

  expect(getByRole('heading')).toBeInTheDocument()
  expect(getByText('DASHBOARD')).toBeInTheDocument()
  expect(getByText('UPLOAD')).toBeInTheDocument()
})
