import React from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "src/components/button/Button";
import { TextField } from "src/components/inputs/TextField";
import { CreateMerchantInput, Merchant } from "src/generated/types";

/**
 * GraphQL
 */

export const CREATE_MERCHANT_MUTATION = gql`
  mutation CreateMerchant($input: CreateMerchantInput!) {
    createMerchant(input: $input) {
      id
      name
      description
    }
  }
`;

/**
 * Types
 */

interface ApolloData {
  merchant: Merchant;
}

interface ApolloMutationVars {
  input: CreateMerchantInput;
}

interface FormValues {
  description: string;
  name: string;
}

/**
 * Helpers
 */

const validationSchema = Yup.object().shape({
  description: Yup.string().required(),
  name: Yup.string().required(),
});

/**
 * Components
 */

export function MerchantForm(): JSX.Element {
  const [createMerchant] = useMutation<ApolloData, ApolloMutationVars>(CREATE_MERCHANT_MUTATION);

  const initialValues: FormValues = { description: "", name: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions): void => {
        createMerchant({ variables: { input: { ...values } } })
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
            data-testid="merchant-description"
            id="merchant-description"
            label="Description"
            name="description"
            required
          />
          <TextField
            data-testid="merchant-name"
            id="merchant-name"
            label="Name"
            name="name"
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
