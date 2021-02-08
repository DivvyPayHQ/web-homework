import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Column } from "react-table";
import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/lib/pipeable";
import styled from "@emotion/styled";

import { Error } from "src/components/error/Error";
import { Loading } from "src/components/loading/Loading";
import { Table } from "src/components/table/Table";
import { Transaction } from "src/generated/types";
import { isBoolean, isUndefined } from "src/utils/typeGuards";

import { TransactionForm } from "./TransactionForm";

/**
 * GraphQL
 */

const TRANSACTIONS_QUERY = gql`
  query ListTransactions {
    transactions {
      id
      amount
      debit
      credit
      description
      merchant {
        id
        name
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

/**
 * Styles
 */

const WrapperS = styled.div`
  width: 500px;
`;

/**
 * Types
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ApolloQueryVars {}

interface ApolloData {
  transactions: Array<Transaction>;
}

/**
 * Helpers
 */

const columns: Array<Column<Transaction>> = [
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ value }) => {
      return pipe(
        value,
        O.fromNullable,
        O.map((v) => `$${v / 100}`),
        O.getOrElse(() => " - "),
      );
    },
  },
  {
    Header: "Debit",
    accessor: "debit",
    Cell: ({ value }) => {
      return pipe(
        value,
        O.fromNullable,
        O.chain(O.fromPredicate(isBoolean)),
        O.map((v) => v.toString()),
        O.getOrElse(() => " - "),
      );
    },
  },
  {
    Header: "Credit",
    accessor: "credit",
    Cell: ({ value }) => {
      return pipe(
        value,
        O.fromNullable,
        O.chain(O.fromPredicate(isBoolean)),
        O.map((v) => v.toString()),
        O.getOrElse(() => " - "),
      );
    },
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ value }) => {
      return pipe(
        value,
        O.fromNullable,
        O.map((desc) => desc),
        O.getOrElse(() => " - "),
      );
    },
  },
  {
    Header: "Merchant Id",
    accessor: "merchant",
    Cell: ({ value }) => {
      return pipe(
        value,
        O.fromNullable,
        O.map((m) => m.id),
        O.getOrElse(() => " - "),
      );
    },
  },
  {
    Header: "User Id",
    accessor: "user",
    Cell: ({ value }) => {
      return pipe(
        value,
        O.fromNullable,
        O.map((u) => u.id),
        O.getOrElse(() => " - "),
      );
    },
  },
];

/**
 * Components
 */

export function TransactionsPage(): JSX.Element {
  const { loading, error, data } = useQuery<ApolloData, ApolloQueryVars>(TRANSACTIONS_QUERY);

  if (loading) {
    return <Loading />;
  }

  if (error || isUndefined(data)) {
    return <Error />;
  }

  return (
    <div>
      <WrapperS>
        <h1>Create Transaction</h1>
        <TransactionForm />
      </WrapperS>
      <h1>List Transactions</h1>
      <Table columns={columns} data={data.transactions} />
    </div>
  );
}
