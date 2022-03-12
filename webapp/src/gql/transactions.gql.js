import { gql } from '@apollo/client'

export const GetTransactions = gql`
  query GetTransactions {
      transactions {
          id
          user_id
          description
          merchant_id
          debit
          credit
          amount
      }
  }
`

export const addTransaction = gql`
  mutation addTransaction(
    $amount: Float!,
    $credit: Boolean!,
    $debit: Boolean!,
    $description: String!,
    $merchant_id: String!,
    $user_id: String!,
  ) {
    addTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, merchant_id:$merchant_id, user_id:$user_id) {
      amount
      credit
      debit
      description
      merchant_id
      user_id
    }
  }
`
