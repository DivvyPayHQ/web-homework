import React from 'react';
import { render, screen } from '@testing-library/react';
import Visualizations from './visualizations';

const transactions = [
  {
    id: 1,
    user_id: '22',
    amount: 12.23
  },
  {
    id: 2,
    user_id: '22',
    amount: 21.44
  }
]

const users = [
  {
    id: '22',
    firstName: 'Sarah',
    lastName: 'Drasner',
    transactions: [1, 2]
  }
]

describe('Visualizations', () => {
  it('should render correct count of transactions and summation of transactions', () => {
    render(
      <Visualizations data={transactions} users={users} />
    );
    expect(screen.queryByText('SD 2')).toBeInTheDocument();
    expect(screen.queryByText('$33.67')).toBeInTheDocument();
  });
});