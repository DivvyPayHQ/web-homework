import React from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "src/components/button/Button";
import { TextField } from "src/components/inputs/TextField";
import { CreateUserInput, User } from "src/generated/types";

/**
 * GraphQL
 */

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      dob
    }
  }
`;

/**
 * Types
 */

interface ApolloData {
  user: User;
}

interface ApolloMutationVars {
  input: CreateUserInput;
}

interface FormValues {
  dob: string;
  firstName: string;
  lastName: string;
}

/**
 * Helpers
 */

const validationSchema = Yup.object().shape({
  dob: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
});

/**
 * Components
 */

export function UserForm(): JSX.Element {
  const [createUser] = useMutation<ApolloData, ApolloMutationVars>(CREATE_USER_MUTATION);

  const initialValues: FormValues = { dob: "", firstName: "", lastName: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions): void => {
        createUser({ variables: { input: { ...values } } })
          .then(() => {
            actions.resetForm();
          })
          .catch((error: ApolloError) => {
            console.error(`Oops: ${error.message}`);
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
      validationSchema={validationSchema}>
      {(formik: FormikProps<FormValues>) => (
        <Form>
          <TextField
            data-testid="user-first-name"
            id="user-first-name"
            label="First Name"
            name="firstName"
            required
          />
          <TextField
            data-testid="user-last-name"
            id="user-last-name"
            label="Last Name"
            name="lastName"
            required
          />
          <TextField
            data-testid="user-dob"
            id="user-dob"
            label="Date of Birth"
            name="dob"
            required
          />
          <Button disabled={formik.isSubmitting} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
