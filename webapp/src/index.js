import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './Routes'
import { ApolloProvider } from 'react-apollo'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
