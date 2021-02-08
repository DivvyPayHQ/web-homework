/* eslint-disable react/jsx-key */
import React from "react";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import styled from "@emotion/styled";
import { Column, useTable } from "react-table";

/**
 * Styles
 */

const TableS = styled.table`
  border-collapse: collapse;
  width: 100%;
  cursor: pointer;

  th {
    background-color: #90caf9;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-of-type(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

/**
 * Types
 */

export interface TableProps {
  columns: Array<Column<any>>; //eslint-disable-line @typescript-eslint/no-explicit-any
  data: Array<any>; //eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Components
 */

export function Table(props: TableProps): JSX.Element {
  const { columns, data } = props;

  const _columns = React.useMemo(() => columns, []);
  const _data = React.useMemo(() => data, []);

  const tableInstance = useTable({ columns: _columns, data: _data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <TableS {...getTableProps()}>
      <thead>
        {pipe(
          headerGroups,
          A.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {pipe(
                group.headers,
                A.map((column) => <th {...column.getHeaderProps()}>{column.render("Header")}</th>),
              )}
            </tr>
          )),
        )}
      </thead>
      <tbody {...getTableBodyProps()}>
        {pipe(
          rows,
          A.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {pipe(
                  row.cells,
                  A.map((cell) => <td {...cell.getCellProps()}>{cell.render("Cell")}</td>),
                )}
              </tr>
            );
          }),
        )}
      </tbody>
    </TableS>
  );
}
