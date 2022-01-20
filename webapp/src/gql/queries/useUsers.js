import { gql, useQuery } from '@apollo/client'

export const USERS = gql`
  query Users {
    users {
      id
      company {
        availableCredit
        creditLine
        id
        insertedAt
        name
        updatedAt
      }
      companyId
      dob
      firstName
      lastName
      insertedAt
      updatedAt
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
function useMerchants () {
  const { data, error, loading } = useQuery(USERS)

  return {
    error,
    loading,
    users: data?.users || []
  }
}

export default useMerchants
