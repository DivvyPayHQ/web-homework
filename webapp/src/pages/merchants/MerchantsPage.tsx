import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Column } from "react-table";
import styled from "@emotion/styled";

import { Error } from "src/components/error/Error";
import { Loading } from "src/components/loading/Loading";
import { Table } from "src/components/table/Table";
import { Merchant } from "src/generated/types";
import { isUndefined } from "src/utils/typeGuards";

import { MerchantForm } from "./MerchantForm";

/**
 * GraphQL
 */

const LIST_MERCHANTS = gql`
  query ListMerchants {
    merchants {
      id
      name
      description
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
  merchants: Array<Merchant>;
}

/**
 * Helpers
 */

const columns: Array<Column<Merchant>> = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Description",
    accessor: "description",
  },
];

/**
 * Components
 */

export function MerchantsPage(): JSX.Element {
  const { loading, error, data } = useQuery<ApolloData, ApolloQueryVars>(LIST_MERCHANTS);

  if (loading) {
    return <Loading />;
  }

  if (error || isUndefined(data)) {
    return <Error />;
  }

  return (
    <div>
      <WrapperS>
        <h1>Create Merchant</h1>
        <MerchantForm />
      </WrapperS>
      <h1>List Merchants</h1>
      <Table columns={columns} data={data.merchants} />
    </div>
  );
}
