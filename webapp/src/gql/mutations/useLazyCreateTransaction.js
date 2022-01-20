import { gql, useMutation } from '@apollo/client'

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $amount: Amount!
    $credit: Boolean!
    $companyId: ID!
    $debit: Boolean!
    $description: String!
    $merchantId: ID!
    $userId: ID!
  ) {
    createTransaction(
      amount: $amount
      credit: $credit
      companyId: $companyId
      debit: $debit
      description: $description
      merchantId: $merchantId
      userId: $userId
    ) {
      amount
      company {
        availableCredit
        creditLine
        id
        insertedAt
        name
        updatedAt
      }
      companyId
      credit
      debit
      description
      id
      insertedAt
      merchantId
      merchant {
        description
        id
        insertedAt
        name
        updatedAt
      }
      updatedAt
      userId
      user {
        id
        dob
        firstName
        lastName
        insertedAt
        updatedAt
      }
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
const useLazyCreateTransaction = (
  options = {
    variables: {}
  }
) => {
  const [createTransaction, { called, data, error, loading }] = useMutation(CREATE_TRANSACTION, options)

  return {
    called,
    error,
    loading,
    mutation: createTransaction,
    transaction: data?.createTransaction || null
  }
}

export default useLazyCreateTransaction
