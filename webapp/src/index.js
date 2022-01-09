import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { AuthContextProvider } from './firebase/AuthContext'

ReactDOM.render(
  (
    <div data-app-init=''>
      <AuthContextProvider>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </AuthContextProvider>
    </div>
  ),
  document.getElementById('react-app')
)
