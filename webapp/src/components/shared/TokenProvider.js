import PropTypes from 'prop-types'
import React from 'react'
import { TokenProvider as KyperTokenProvider } from '@kyper/tokenprovider'

export function TokenProvider ({ children }) {
  return (
    <KyperTokenProvider
      theme='dark'
      tokenOverrides={{
        Color: {
          Brand300: '#FF41B4',
          Green: '#B4FF41',
          Blue: '#41B4FF'
        }
      }}
    >
      {children}
    </KyperTokenProvider>
  )
}

TokenProvider.propTypes = {
  children: PropTypes.any
}
