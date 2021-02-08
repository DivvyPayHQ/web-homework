import React from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import { Button } from "src/components/button/Button";
import { TextField } from "src/components/inputs/TextField";
import { CreateTransactionInput, Transaction } from "src/generated/types";

/**
 * GraphQL
 */

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      amount
      credit
      debit
      description
      user {
        id
        firstName
        lastName
      }
      merchant {
        id
        name
      }
    }
  }
`;

/**
 * Types
 */

interface ApolloData {
  transation: Transaction;
}

interface ApolloMutationVars {
  input: CreateTransactionInput;
}

interface FormValues {
  amount: string;
  credit: string;
  debit: string;
  description: string;
  merchantId: string;
  userId: string;
}

/**
 * Helpers
 */

const validationSchema = Yup.object().shape({
  amount: Yup.string().required(),
  credit: Yup.boolean().required(),
  debit: Yup.boolean().required(),
  description: Yup.string().required(),
  merchantId: Yup.string().required(),
  userId: Yup.string().required(),
});

/**
 * Components
 */

export function TransactionForm(): JSX.Element {
  const [createTransaction] = useMutation<ApolloData, ApolloMutationVars>(
    CREATE_TRANSACTION_MUTATION,
  );

  const initialValues: FormValues = {
    amount: "",
    credit: "",
    debit: "",
    description: "",
    merchantId: "",
    userId: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions): void => {
        createTransaction({
          variables: {
            input: {
              amount: parseInt(values.amount, 10),
              credit: Boolean(values.credit),
              debit: Boolean(values.debit),
              description: values.description,
              merchantId: values.merchantId,
              userId: values.userId,
            },
          },
        })
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
            data-testid="transaction-amount"
            id="transaction-amount"
            label="Amount"
            name="amount"
            required
          />
          <TextField
            data-testid="transaction-credit"
            id="transaction-credit"
            label="Credit"
            name="credit"
            required
          />
          <TextField
            data-testid="transaction-debit"
            id="transaction-debit"
            label="Debit"
            name="debit"
            required
          />
          <TextField
            data-testid="transaction-desc"
            id="transaction-desc"
            label="Description"
            name="description"
            required
          />
          <TextField
            data-testid="transaction-merchant-id"
            id="transaction-merchant-id"
            label="Merchant Id"
            name="merchantId"
            required
          />
          <TextField
            data-testid="transaction-user-id"
            id="transaction-user-id"
            label="User Id"
            name="userId"
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
