import React from 'react'
import { arrayOf, string, bool, number, shape, func, array } from 'prop-types'
import { css } from '@emotion/core'
import { Button, Table } from 'rsuite';
import { DeleteTransaction } from '../../gql/transactions.gql';
import { useMutation } from '@apollo/client';

const { Column, HeaderCell, Cell, Pagination } = Table;

const styles = css`
  padding: 0px 40px;
  .removeButton {
    margin-top: -8px;
  }
`
export function TxTable ({ data, setTransaction, users }) {
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
    <div css={styles}>
      <Table autoHeight data={data} onRowClick={setTransaction}>
        <Column>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={200}>
          <HeaderCell>User</HeaderCell>
          <Cell>
            {rowData => {
              const user = users.find(user => user.id === rowData.user_id);
              return user ? `${user.firstName} ${user.lastName}` : rowData.user_id;
            }}
          </Cell>
        </Column>
        <Column>
          <HeaderCell>Description</HeaderCell>
          <Cell dataKey="description" />
        </Column>
        <Column>
          <HeaderCell>Merchant ID</HeaderCell>
          <Cell dataKey="merchant_id" />
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
  users: array,
}
