import React from 'react'
import { render } from '@testing-library/react'
import { TokenProvider } from '@kyper/tokenprovider'
import { BrowserRouter as Router } from 'react-router-dom'

const AllTheProviders = ({children}) => {
  return (
    <TokenProvider>
      <Router>
        {children}
      </Router>
    </TokenProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }