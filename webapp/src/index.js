import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { StylesProvider } from '@material-ui/core/styles'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <StylesProvider injectFirst>
          <AppRouter />
        </StylesProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
