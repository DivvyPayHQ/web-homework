import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Column } from "react-table";

import { Error } from "src/components/error/Error";
import { Loading } from "src/components/loading/Loading";
import { Table } from "src/components/table/Table";
import { User } from "src/generated/types";
import { isUndefined } from "src/utils/typeGuards";

import { UserForm } from "./UserForm";
import { DeleteUser } from "./DeleteUser";

/**
 * GraphQL
 */

const LIST_USERS_QUERY = gql`
  query ListUsers {
    users {
      id
      dob
      firstName
      lastName
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
  users: Array<User>;
}

/**
 * Helpers
 */

const columns: Array<Column<User>> = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Date of Birth",
    accessor: "dob",
  },
  {
    Header: "Delete",
    accessor: "id",
    // eslint-disable-next-line react/display-name
    Cell: ({ value }) => <DeleteUser id={value} />,
  },
];

/**
 * Components
 */

export function UsersPage(): JSX.Element {
  const { loading, error, data } = useQuery<ApolloData, ApolloQueryVars>(LIST_USERS_QUERY);

  if (loading) {
    return <Loading />;
  }

  if (error || isUndefined(data)) {
    return <Error />;
  }

  return (
    <div>
      <WrapperS>
        <h1>Create User</h1>
        <UserForm />
      </WrapperS>
      <h1>List Users</h1>
      <Table columns={columns} data={data.users} />
    </div>
  );
}
