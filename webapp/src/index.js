import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
  (
    <div data-app-init='' style={{ height: '100%' }}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </Provider>
    </div>
  ),
  document.getElementById('react-app')
)
