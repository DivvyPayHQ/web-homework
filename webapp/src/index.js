import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './Routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <AppRouter />
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
