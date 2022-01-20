import { gql, useQuery } from '@apollo/client'

export const TRANSACTION = gql`
  query Transaction($id: ID!) {
    transaction(id: $id) {
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
function useTransaction (variables) {
  const { data, error, loading } = useQuery(TRANSACTION, { variables })

  return {
    error,
    loading,
    transaction: data?.transaction || null
  }
}

export default useTransaction
