import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { client } from './network/apollo-client'
import { StylesProvider } from '@material-ui/core/styles'
import { ApolloProvider } from '@apollo/react-hooks'

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
