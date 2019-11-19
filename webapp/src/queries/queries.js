import gql from 'graphql-tag'

export const GET_ADDED_TRANSACTIONS = gql`
  {
    transactions {
      amount
      debit
      credit
      description
      merchantId: merchant_id
      dateAdded
      transactionId
      category
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation(
    $transactionId: String!
  ) {
    deleteTransaction(
      transactionId: $transactionId
    ) {
      transactionId
    }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation(
    $amount: Float!
    $debit: Boolean!
    $credit: Boolean!
    $description: String!
    $merchant_id: String!
    $dateAdded: String!
    $transactionId: String!
    $category: String!
  ) {
    updatedTransaction(
      amount: $amount
      debit: $debit
      credit: $credit
      description: $description
      merchant_id: $merchant_id
      dateAdded: $dateAdded
      transactionId: $transactionId
      category: $category
    ) {
      amount
      debit
      credit
      description
      merchant_id
      dateAdded
      transactionId
      category
    }
  }
`

export const ADD_TRANSACTION = gql`
  mutation(
    $amount: Float!
    $debit: Boolean!
    $credit: Boolean!
    $description: String!
    $merchant_id: String!
    $dateAdded: String!
    $transactionId: String!
    $category: String!
  ) {
    addTransaction(
      amount: $amount
      debit: $debit
      credit: $credit
      description: $description
      merchant_id: $merchant_id
      dateAdded: $dateAdded
      transactionId: $transactionId
      category: $category
    ) {
      amount
      debit
      credit
      description
      merchant_id
      dateAdded
      transactionId
      category
    }
  }
`
