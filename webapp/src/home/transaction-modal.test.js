import React from 'react'
import {render} from '@testing-library/react'
import TransactionModal from './transaction-modal'
import { MockedProvider } from '@apollo/client/testing'

describe(`<TransactionModal />`, () => {
  it(`renders`, () => {
    render(
      <MockedProvider>
        <TransactionModal />
      </MockedProvider>
    );
  })
})