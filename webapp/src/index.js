import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <CssBaseline />
        <AppRouter />
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
