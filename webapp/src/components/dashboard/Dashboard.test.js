import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import Dashboard from './Dashboard'

// TODO: add this into a test-utils file to reduce boilerplate
// const AllTheProviders = ({ children }) => {
//   return (
//     <MockedProvider>
//       <BrowserRouter>
//         {children}
//       </BrowserRouter>
//     </MockedProvider>
//   )
// }

test('loads and displays the Dashboard component', async () => {
  const { getByText } = render(<BrowserRouter><Dashboard /></BrowserRouter>, { wrapper: MockedProvider })

  // TODO: this needs to be a better test
  expect(getByText('Balance:')).toBeInTheDocument()
  await wait()
})
