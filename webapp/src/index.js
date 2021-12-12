import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import Modal from 'react-modal'

import { client } from './network/apollo-client'

import { TokenProvider } from 'src/components/shared/TokenProvider'

// Setup for a11y with portals and hidden content
Modal.setAppElement('#react-app')

ReactDOM.render(
  (
    <div data-app-init='' id='root'>
      <ApolloProvider client={client}>
        <TokenProvider>
          <AppRouter />
        </TokenProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
