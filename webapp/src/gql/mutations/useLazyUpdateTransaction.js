import { gql, useMutation } from '@apollo/client'

const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $amount: Amount
    $credit: Boolean
    $debit: Boolean
    $description: String
    $merchantId: ID
    $userId: ID
  ) {
    updateTransaction(
      id: $id
      amount: $amount
      credit: $credit
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
const useLazyUpdateTransaction = (
  options = {
    variables: {}
  }
) => {
  const [updateTransaction, { called, data, error, loading }] = useMutation(UPDATE_TRANSACTION, options)

  return {
    called,
    error,
    loading,
    mutation: updateTransaction,
    transaction: data?.updateTransaction || null
  }
}

export default useLazyUpdateTransaction
