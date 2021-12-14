import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import Modal from 'react-modal'
import { css } from '@emotion/core'

import { client } from './network/apollo-client'

import { TokenProvider } from 'src/components/shared/TokenProvider'

// Setup for a11y with portals and hidden content
Modal.setAppElement('#react-app')

const containerStyle = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

ReactDOM.render(
  (
    <div css={containerStyle} data-app-init='' id='root'>
      <ApolloProvider client={client}>
        <TokenProvider>
          <AppRouter />
        </TokenProvider>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('react-app')
)
