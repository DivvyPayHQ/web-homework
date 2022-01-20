import { gql, useQuery } from '@apollo/client'

export const TRANSACTIONS = gql`
  query Transactions {
    transactions {
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
function useTransactions () {
  const { data, error, loading } = useQuery(TRANSACTIONS)

  return {
    error,
    loading,
    transactions: data?.transactions || []
  }
}

export default useTransactions
