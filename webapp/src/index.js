import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from '@apollo/client'
import AppRouter from './routes'
import { client } from './network/apollo-client'
import theme from './styles/theme'

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
