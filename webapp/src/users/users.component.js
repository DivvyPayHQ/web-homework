import { useQuery } from '@apollo/client'
import {GetUsers} from '../gql/users.gql'
import React from 'react'
import { Table } from 'rsuite';
import { composeName } from '../utility';

export default function Users (props) {

  const {loading, data: {users} = {}} = useQuery(GetUsers)
  const {Column, HeaderCell, Cell} = Table

  return (
    <Table autoHeight data={users} loading={loading}>
      <Column>
        <HeaderCell>ID</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column width={150}>
        <HeaderCell>Name</HeaderCell>
        <Cell>{rowData => composeName(rowData)}</Cell>
      </Column>
      <Column>
        <HeaderCell>DOB</HeaderCell>
        <Cell>{rowData => new Intl.DateTimeFormat().format(new Date(rowData.dob))}</Cell>
      </Column>
      <Column>
        <HeaderCell>Transactions</HeaderCell>
        <Cell>{rowData => rowData.transactions.length}</Cell>
      </Column>
    </Table>
  );

}