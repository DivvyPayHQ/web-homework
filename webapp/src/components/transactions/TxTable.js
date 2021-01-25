import React, { useEffect, useState } from 'react'
import { arrayOf, string, bool, number, shape, func, array } from 'prop-types'
import { css } from '@emotion/core'
import { Button, Input, Table } from 'rsuite';
import { DeleteTransaction } from '../../gql/transactions.gql';
import { useMutation } from '@apollo/client';

const { Column, HeaderCell, Cell } = Table;

const styles = css`
  flex: 1;
  .removeButton {
    margin-top: -8px;
  }
`
const headerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rightItems {
    display: flex;
  }
  .rightItems > * {
    margin-left: 10px;
  }
`;
export function TxTable ({ data, setTransaction, users, refetchTx, refetchUser }) {
  const [seed, reseed] = useState()
  const [count, setCount] = useState('0')
  useEffect(() => {
    if (seed) {
      fetch('http://localhost:8000/seed', {
        method: 'POST',
        body: JSON.stringify({ count }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        refetchTx()
        refetchUser()
      });
    }
  },[seed])
  const [del] = useMutation(DeleteTransaction, {
    update: (cache, {data: {deleteTransaction}}) => {
      cache.modify({
        fields: {
          transactions(existing = [], {readField}) {
            return existing.filter(trRef => deleteTransaction.id !== readField('id', trRef));
          }
        }
      })
    }
  });
  const deleteTransaction = ({id}) => {
    del({variables: {id}})
  }
  return (
    <>
      <div css={styles}>
        <div css={headerStyles}>
          <h1>Transactions</h1>
          <div className='rightItems'>
            <div style={{ width: 45 }}>
              <Input onChange={val => setCount(val)} value={count} />
            </div>
            <Button onClick={() => reseed(true)}>Reseed</Button>
            <Button onClick={() => setTransaction(true)}>Add transaction</Button>
          </div>
        </div>
        <Table autoHeight data={data} onRowClick={setTransaction}>
          <Column flexGrow={1}>
            <HeaderCell>ID</HeaderCell>
            <Cell>{rowData => `...${rowData.id.substring('12')}`}</Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>User</HeaderCell>
            <Cell>
              {rowData => {
                const user = users.find(user => user.id === rowData.user_id);
                return user ? `${user.firstName} ${user.lastName}` : rowData.user_id;
              }}
            </Cell>
          </Column>
          <Column flexGrow={1}>
            <HeaderCell>Description</HeaderCell>
            <Cell dataKey="description" />
          </Column>
          <Column>
            <HeaderCell>Debit</HeaderCell>
            <Cell>{rowData => (rowData.debit ? '✔️' : '')}</Cell>
          </Column>
          <Column>
            <HeaderCell>Credit</HeaderCell>
            <Cell>{rowData => (rowData.credit ? '✔️' : '')}</Cell>
          </Column>
          <Column>
            <HeaderCell>Amount</HeaderCell>
            <Cell>
              {rowData => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.amount)}
            </Cell>
          </Column>
          <Column>
            <HeaderCell>Delete</HeaderCell>
            <Cell>
              {rowData => (
                <Button className="removeButton" onClick={e => e.stopPropagation() || deleteTransaction(rowData)}>
                  Remove
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    </>
  );
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  })),
  setTransaction: func,
  users: arrayOf(shape({
    dob: string,
    firstName: string,
    id: string,
    lastName: string,
    transactions: Array,
  })),
  refetchTx: func,
  refetchUser: func,
}
