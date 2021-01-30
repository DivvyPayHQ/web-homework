import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { StylesProvider } from '@material-ui/core/styles'
import { ApolloProvider as ReactApolloProvider } from '@apollo/react-hooks'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <ReactApolloProvider client={client}>
          <StylesProvider injectFirst>
            <AppRouter />
          </StylesProvider>
        </ReactApolloProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
