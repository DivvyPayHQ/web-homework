import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'
import { ThemeProvider } from '@emotion/react'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles'
import { theme } from './styles/theme'

const muiTheme = createMuiTheme(theme)

ReactDOM.render(
  (
    <div data-app-init=''>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={muiTheme}>
            <AppRouter />
          </ThemeProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
