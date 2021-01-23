import React from 'react'
import { arrayOf, string, bool, number, shape, func } from 'prop-types'
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
export function TxTable ({ data, setTransaction }) {
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
        <Column>
          <HeaderCell>User ID</HeaderCell>
          <Cell dataKey="user_id" />
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
          <Cell dataKey="debit" />
        </Column>
        <Column>
          <HeaderCell>Credit</HeaderCell>
          <Cell dataKey="credit" />
        </Column>
        <Column>
          <HeaderCell>Amount</HeaderCell>
          <Cell dataKey="amount" />
        </Column>
        <Column>
          <HeaderCell>Delete</HeaderCell>
          <Cell>
            {rowData => (
              <Button className='removeButton' onClick={e => e.stopPropagation() || deleteTransaction(rowData)}>
                Remove
              </Button>
              )
            }
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
}
