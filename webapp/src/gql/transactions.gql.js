const gql = require('graphql-tag')

export const getTransactions = gql`
  query getTransactions {
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

export const createTransaction = gql`
  mutation createTransaction(
    $amount: Int!,
    $credit: Boolean!,
    $debit: Boolean!,
    $description: String!,
    $merchantId: ID!,
    $userId: ID!,
  ) {
    createTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, merchantId:$merchantId, userId:$userId) {
      amount
      credit
      debit
      description
      merchant_id
      user_id
    }
  }
`

export const deleteTransaction = gql`
  mutation deleteTransaction(
    $id: ID!
  ) {
    deleteTransaction(id: $id) {
      amount
    }
  }
`
