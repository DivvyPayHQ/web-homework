import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ReactHooks } from '@apollo/react-hooks'
import { client } from './network/apollo-client'
import { StylesProvider } from '@material-ui/core/styles'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <ReactHooks client={client}>
          <StylesProvider injectFirst>
            <AppRouter />
          </StylesProvider>
        </ReactHooks>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
