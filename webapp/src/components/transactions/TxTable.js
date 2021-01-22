import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;

const styles = css`
  padding: 0px 40px;
`
export function TxTable ({ data }) {
  return (
    <div css={styles}>
      <Table
        data={data}
        onRowClick={data => {
          console.log(data);
        }}
      >
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
  }))
}
