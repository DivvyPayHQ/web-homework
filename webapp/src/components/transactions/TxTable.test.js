import React from 'react';
import { render, screen } from '@testing-library/react'
import {transactions} from 'mocks/transactions-data.js';
import { TxTable } from './TxTable';
import { MockedProvider } from '@apollo/client/testing';

describe('Transactions Table', () => {
  it('should show user "employee4" with amount "150"', () => {
    render(
      <MockedProvider>
        <TxTable data={transactions} users={[]} />
      </MockedProvider>
    );
    const row = screen.queryByText('employee4').parentElement.parentElement
    expect(row.textContent.includes('150')).toBeTruthy()
  })

})
