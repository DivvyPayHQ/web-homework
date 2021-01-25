import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import TransactionModal from './transaction-modal'
import { MockedProvider } from '@apollo/client/testing'

describe(`<TransactionModal />`, () => {
  it(`renders`, () => {
    render(
      <MockedProvider>
        <TransactionModal users={[]} />
      </MockedProvider>
    );
  })
  it(`validates for user`, () => {
    render(
      <MockedProvider>
        <TransactionModal transaction users={[{id: 1, firstName: 'James', lastName: 'Comeau'}]} />
      </MockedProvider>
    );
    expect(screen.getByText(/Save/i).closest('button')).toBeDisabled()
    fireEvent.click(screen.getByText('select'));
    fireEvent.click(screen.getByText(/James/i));
    expect(screen.getByText(/Save/i).closest('button')).not.toBeDisabled();
  });
})