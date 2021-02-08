import React from "react";
import { gql, useMutation } from "@apollo/client";

import { User } from "src/generated/types";
import { Button } from "src/components/button/Button";

/**
 * GraphQL
 */

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

/**
 * Types
 */

interface ApolloMutationVars {
  id: string;
}

interface ApolloData {
  deleteUser: User;
}

interface DeleteUserProps {
  id: string;
}

/**
 * Components
 */

export const DeleteUser = (props: DeleteUserProps): JSX.Element => {
  const { id } = props;

  const [deleteUser] = useMutation<ApolloData, ApolloMutationVars>(DELETE_USER_MUTATION, {
    variables: {
      id,
    },
    // update(cache, result) {
    //   cache.modify({
    //     id: result.data?.deleteUser.id || "",
    //     fields: {
    //       users(existingUsers = []) {
    //         return [];
    //       },
    //     },
    //   });
    // },
  });

  return (
    <Button
      onClick={() => {
        deleteUser().catch(() => {
          console.error("Error");
        });
      }}>
      Trash
    </Button>
  );
};
