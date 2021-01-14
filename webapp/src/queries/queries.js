import gql from 'graphql-tag'

const getTransactionQuery = gql`
  {
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

const addTransactionQuery = gql`
  mutation(
    $user_id: String!
    $description: String!
    $merchant_id: String!
    $debit: Boolean
    $credit: Boolean
    $amount: Float
  ) {
    addTransaction(
      user_id: $user_id
      description: $description
      merchant_id: $merchant_id
      debit: $debit
      credit: $credit
      amount: $amount
    ) {
      description
      id
    }
  }
`

const removeTransaction = gql`
  mutation DeleteTransaction($transactionId: String!) {
    deleteTransaction(transactionId: $transactionId) {
      id
    }
  }
`

// export { getTransactionQuery }
// export { addTransactionQuery }

export { getTransactionQuery, addTransactionQuery, removeTransaction }
